export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { code, stdin = "" } = req.body || {};

  if (!code || typeof code !== "string" || !code.trim()) {
    return res.status(400).json({ error: "No Java code provided" });
  }

  try {
    const sanitizedCode = code.replace(/\bpublic\s+class\s+([A-Za-z0-9_$]+)/g, "class $1");
    const wandboxRes = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler: "openjdk-jdk-21+35",
        code: sanitizedCode,
        stdin: stdin || "",
      }),
    });

    if (!wandboxRes.ok) {
      throw new Error(`Wandbox status ${wandboxRes.status}`);
    }

    const data = (await wandboxRes.json()) as any;
    const compileErr = (data.compiler_error || data.compiler_message || "").replace(/prog\.java/g, "Main.java");
    const progErr = (data.program_error || "").replace(/prog\.java/g, "Main.java");
    const stdout = data.program_output || "";
    const stderr = (compileErr ? compileErr + "\n" : "") + progErr;
    const exitCode = parseInt(data.status ?? "0", 10);

    return res.status(200).json({
      stdout,
      stderr: stderr.trim(),
      exitCode,
    });
  } catch (err: any) {
    return res.status(500).json({
      stdout: "",
      stderr: `OpenJDK Execution Error: ${err.message || err}`,
      exitCode: 1,
    });
  }
}
