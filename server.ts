import express from "express";
import path from "path";
import { spawn, execFile } from "child_process";
import fs from "fs";
import os from "os";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Helper to determine Java class name
function getClassName(code: string): string {
  const publicMatch = code.match(/public\s+class\s+([A-Za-z0-9_$]+)/);
  if (publicMatch && publicMatch[1]) return publicMatch[1];

  const mainClassMatch = code.match(/class\s+([A-Za-z0-9_$]+)[^{]*\{[\s\S]*?public\s+static\s+void\s+main/);
  if (mainClassMatch && mainClassMatch[1]) return mainClassMatch[1];

  const firstClassMatch = code.match(/class\s+([A-Za-z0-9_$]+)/);
  if (firstClassMatch && firstClassMatch[1]) return firstClassMatch[1];

  return "Main";
}

// Fallback to Wandbox OpenJDK API
async function runWithWandbox(code: string, stdin: string = ""): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  try {
    // In Wandbox, non-public class avoids prog.java file mismatch
    const sanitizedCode = code.replace(/\bpublic\s+class\s+([A-Za-z0-9_$]+)/g, "class $1");
    const response = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({
        compiler: "openjdk-jdk-21+35",
        code: sanitizedCode,
        stdin: stdin || "",
        "compiler-option-raw": "-encoding\nUTF-8",
        "runtime-option-raw": "-Dstdout.encoding=UTF-8\n-Dstderr.encoding=UTF-8\n-Dfile.encoding=UTF-8",
      }),
    });

    if (!response.ok) {
      throw new Error(`Wandbox status: ${response.status}`);
    }

    const data = await response.json();
    const compileErr = (data.compiler_error || data.compiler_message || "").replace(/prog\.java/g, "Main.java");
    const progErr = (data.program_error || "").replace(/prog\.java/g, "Main.java");
    const progOut = data.program_output || "";
    const status = parseInt(data.status ?? "0", 10);

    const fullStderr = (compileErr ? compileErr + "\n" : "") + progErr;
    return {
      stdout: progOut,
      stderr: fullStderr.trim(),
      exitCode: status,
    };
  } catch (err: any) {
    return {
      stdout: "",
      stderr: `OpenJDK Compiler Service Error: ${err.message || err}`,
      exitCode: 1,
    };
  }
}

// Local OpenJDK execution using javac and java
function runLocalOpenJDK(code: string, stdin: string = ""): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve) => {
    const className = getClassName(code);
    let tmpDir: string;
    try {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "openjdk-run-"));
    } catch {
      // If tmpdir fails, try wandbox
      return runWithWandbox(code, stdin).then(resolve);
    }

    const javaFile = path.join(tmpDir, `${className}.java`);
    try {
      fs.writeFileSync(javaFile, code, "utf-8");
    } catch (err: any) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      return resolve({ stdout: "", stderr: `File write error: ${err.message}`, exitCode: 1 });
    }

    // Compile with javac
    execFile("javac", ["-encoding", "UTF-8", `${className}.java`], { cwd: tmpDir, timeout: 12000 }, (compileErr, stdout, stderr) => {
      if (compileErr) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        const errorMsg = stderr || stdout || compileErr.message;
        const codeNum = typeof compileErr.code === "number" ? compileErr.code : 1;
        return resolve({ stdout: "", stderr: errorMsg.trim(), exitCode: codeNum });
      }

      // Execute with java JVM
      const child = spawn("java", ["-Dfile.encoding=UTF-8", "-XX:TieredStopAtLevel=1", "-Xmx256m", className], {
        cwd: tmpDir,
      });

      let runStdout = "";
      let runStderr = "";
      let timedOut = false;

      const timer = setTimeout(() => {
        timedOut = true;
        child.kill("SIGKILL");
      }, 10000);

      child.stdout.on("data", (d) => {
        runStdout += d.toString("utf-8");
      });

      child.stderr.on("data", (d) => {
        runStderr += d.toString("utf-8");
      });

      if (stdin) {
        try {
          child.stdin.write(stdin);
          child.stdin.end();
        } catch {
          // Stdin already closed
        }
      } else {
        try {
          child.stdin.end();
        } catch {
          // Stdin already closed
        }
      }

      child.on("error", (spawnErr) => {
        clearTimeout(timer);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        resolve({
          stdout: runStdout,
          stderr: (runStderr ? runStderr + "\n" : "") + `Execution Error: ${spawnErr.message}`,
          exitCode: 1,
        });
      });

      child.on("close", (code) => {
        clearTimeout(timer);
        fs.rmSync(tmpDir, { recursive: true, force: true });

        if (timedOut) {
          return resolve({
            stdout: runStdout,
            stderr: (runStderr ? runStderr + "\n" : "") + "Execution timed out (10 seconds limit exceeded).\nCheck for infinite loops or pending scanner inputs.",
            exitCode: 124,
          });
        }

        resolve({
          stdout: runStdout,
          stderr: runStderr.trim(),
          exitCode: code ?? 0,
        });
      });
    });
  });
}

// Active running processes for interactive terminal stdin
interface ActiveProcess {
  child: ReturnType<typeof spawn>;
  tmpDir: string;
  timer: NodeJS.Timeout;
}
const activeProcesses = new Map<string, ActiveProcess>();

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", compiler: "OpenJDK 17 / 21" });
});

// Interactive Stdin endpoint
app.post("/api/run-java/input", (req, res) => {
  const { sessionId, input } = req.body || {};
  if (!sessionId || typeof input !== "string") {
    return res.status(400).json({ error: "Missing sessionId or input string" });
  }
  const proc = activeProcesses.get(sessionId);
  if (!proc || !proc.child || proc.child.killed || !proc.child.stdin) {
    return res.status(404).json({ error: "Process not found or already terminated" });
  }
  try {
    proc.child.stdin.write(input);
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Stop process endpoint
app.post("/api/run-java/stop", (req, res) => {
  const { sessionId } = req.body || {};
  if (sessionId && activeProcesses.has(sessionId)) {
    const proc = activeProcesses.get(sessionId);
    try {
      proc?.child.kill("SIGKILL");
    } catch {}
    activeProcesses.delete(sessionId);
  }
  return res.json({ success: true });
});

// Streaming compilation & real-time execution endpoint with interactive stdin support
app.post("/api/run-java-stream", async (req, res) => {
  const { code, stdin = "" } = req.body || {};

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders?.();

  const sendEvent = (event: string, data: any) => {
    try {
      res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    } catch {}
  };

  if (typeof code !== "string" || !code.trim()) {
    sendEvent("stderr", { text: "Main.java: error: No Java code provided to compile.\n" });
    sendEvent("exit", { exitCode: 1 });
    return res.end();
  }

  const className = getClassName(code);
  let tmpDir: string;
  try {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "openjdk-run-"));
  } catch (e: any) {
    sendEvent("stderr", { text: `Tmpdir error: ${e.message}\n` });
    sendEvent("exit", { exitCode: 1 });
    return res.end();
  }

  const javaFile = path.join(tmpDir, `${className}.java`);
  try {
    fs.writeFileSync(javaFile, code, "utf-8");
  } catch (err: any) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    sendEvent("stderr", { text: `File write error: ${err.message}\n` });
    sendEvent("exit", { exitCode: 1 });
    return res.end();
  }

  // Check if javac is available locally
  execFile("javac", ["-version"], { timeout: 2000 }, async (verErr) => {
    if (verErr) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      const wandboxResult = await runWithWandbox(code, stdin);
      if (wandboxResult.stdout) {
        sendEvent("stdout", { text: wandboxResult.stdout });
      }
      if (wandboxResult.stderr) {
        sendEvent("stderr", { text: wandboxResult.stderr + "\n" });
      }
      sendEvent("exit", { exitCode: wandboxResult.exitCode });
      return res.end();
    }

    // Compile with javac
    execFile("javac", ["-encoding", "UTF-8", `${className}.java`], { cwd: tmpDir, timeout: 12000 }, (compileErr, stdout, stderr) => {
      if (compileErr) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        const errorMsg = (stderr || stdout || compileErr.message).trim();
        sendEvent("stderr", { text: errorMsg + "\n" });
        sendEvent("exit", { exitCode: typeof compileErr.code === "number" ? compileErr.code : 1 });
        return res.end();
      }

      const sessionId = "sess_" + Date.now() + "_" + Math.random().toString(36).substring(2, 8);
      sendEvent("session", { sessionId });

      const child = spawn("java", ["-Dfile.encoding=UTF-8", "-Dsun.jnu.encoding=UTF-8", "-Dstdout.encoding=UTF-8", "-Dstderr.encoding=UTF-8", "-XX:TieredStopAtLevel=1", "-Xmx256m", className], {
        cwd: tmpDir,
      });

    let isDone = false;
    const cleanup = () => {
      if (isDone) return;
      isDone = true;
      clearTimeout(timer);
      activeProcesses.delete(sessionId);
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch {}
    };

    const timer = setTimeout(() => {
      try {
        child.kill("SIGKILL");
      } catch {}
      sendEvent("stderr", { text: "\nExecution timed out (60 seconds limit exceeded).\n" });
      sendEvent("exit", { exitCode: 124 });
      cleanup();
      res.end();
    }, 60000);

    activeProcesses.set(sessionId, { child, tmpDir, timer });

    // If pre-defined stdin was provided, write it
    if (stdin && child.stdin) {
      try {
        child.stdin.write(stdin);
        child.stdin.end();
      } catch {}
    }
    // When no pre-defined stdin is given, child.stdin stays OPEN so Scanner can wait for interactive input!

    child.stdout.on("data", (d) => {
      sendEvent("stdout", { text: d.toString("utf-8") });
    });

    child.stderr.on("data", (d) => {
      sendEvent("stderr", { text: d.toString("utf-8") });
    });

    child.on("error", (spawnErr) => {
      sendEvent("stderr", { text: `Execution error: ${spawnErr.message}\n` });
      sendEvent("exit", { exitCode: 1 });
      cleanup();
      res.end();
    });

    child.on("close", (code) => {
      sendEvent("exit", { exitCode: code ?? 0 });
      cleanup();
      res.end();
    });

    req.on("close", () => {
      try {
        child.kill("SIGKILL");
      } catch {}
      cleanup();
    });
  });
});
});

app.post("/api/run-java", async (req, res) => {
  const { code, stdin = "" } = req.body || {};

  if (typeof code !== "string" || !code.trim()) {
    return res.status(400).json({
      stdout: "",
      stderr: "Main.java: error: No Java code provided to compile.",
      exitCode: 1,
    });
  }

  try {
    // Check if javac exists in environment
    const hasLocalJavac = await new Promise<boolean>((r) => {
      execFile("javac", ["-version"], { timeout: 3000 }, (err) => {
        r(!err);
      });
    });

    let result;
    if (hasLocalJavac) {
      result = await runLocalOpenJDK(code, stdin);
    } else {
      result = await runWithWandbox(code, stdin);
    }

    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({
      stdout: "",
      stderr: `Server Error: ${err.message || "Unknown error during compilation"}`,
      exitCode: 1,
    });
  }
});

// Vite middleware & Static Serving
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Java Master Pro Server running on http://0.0.0.0:${PORT}`);
  });
}

initServer();
