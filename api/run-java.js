// Vercel Serverless Function to run Java code via OpenJDK compiler service
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code, stdin = "" } = req.body || {};

  if (!code || !code.trim()) {
    return res.status(400).json({
      stdout: "",
      stderr: "Main.java: error: No Java code provided.",
      exitCode: 1,
    });
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
        "compiler-option-raw": "-encoding\nUTF-8",
        "runtime-option-raw": "-Dstdout.encoding=UTF-8\n-Dstderr.encoding=UTF-8\n-Dfile.encoding=UTF-8",
      }),
    });

    if (!wandboxRes.ok) {
      throw new Error(`Compiler service returned status: ${wandboxRes.status}`);
    }

    const data = await wandboxRes.json();
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
  } catch (err) {
    return res.status(500).json({
      stdout: "",
      stderr: `OpenJDK Execution Error: ${err.message || err}`,
      exitCode: 1,
    });
  }
}
