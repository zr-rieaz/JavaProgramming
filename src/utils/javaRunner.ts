import { ExecutionResult } from "../types";

export interface RunJavaOptions {
  code: string;
  stdin?: string;
  onStdout?: (chunk: string) => void;
  onStderr?: (chunk: string) => void;
  onSession?: (sessionId: string) => void;
  onPromptInput?: (promptMsg?: string) => Promise<string>;
  signal?: AbortSignal;
}

/**
 * Execute real Java code using original OpenJDK compiler (javac) and runtime (java JVM).
 * Primary: Server-side OpenJDK 17 real-time streaming (/api/run-java-stream) with interactive stdin.
 * Secondary: Server-side standard endpoint (/api/run-java).
 * Fallback: Wandbox OpenJDK 21 API with direct CORS support.
 */
export async function runJavaCodeOnline(
  options: RunJavaOptions
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const { code, stdin, onStdout, onStderr, onSession, signal } = options;
  const safeStdin = typeof stdin === "string" ? stdin : "";

  if (!code || !code.trim()) {
    const emptyErr = "Main.java: error: No Java code provided to compile.\n";
    onStderr?.(emptyErr);
    return { stdout: "", stderr: emptyErr, exitCode: 1 };
  }

  // 1. Try real-time streaming endpoint with OpenJDK 17 and interactive stdin
  try {
    const streamController = new AbortController();
    const timeoutId = setTimeout(() => streamController.abort(), 65000);

    const response = await fetch("/api/run-java-stream", {
      method: "POST",
      signal: signal || streamController.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, stdin: safeStdin }),
    });
    clearTimeout(timeoutId);

    const contentType = response.headers.get("content-type") || "";
    if (response.ok && response.body && contentType.includes("text/event-stream")) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let accumulatedStdout = "";
      let accumulatedStderr = "";
      let exitCode = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const block of lines) {
          if (!block.trim()) continue;
          let currentEvent = "message";
          let currentData = "";

          for (const line of block.split("\n")) {
            if (line.startsWith("event: ")) {
              currentEvent = line.slice(7).trim();
            } else if (line.startsWith("data: ")) {
              currentData = line.slice(6);
            }
          }

          if (currentData) {
            try {
              const parsed = JSON.parse(currentData);
              if (currentEvent === "session" && parsed.sessionId) {
                onSession?.(parsed.sessionId);
              } else if (currentEvent === "stdout" && parsed.text) {
                accumulatedStdout += parsed.text;
                onStdout?.(parsed.text);
              } else if (currentEvent === "stderr" && parsed.text) {
                accumulatedStderr += parsed.text;
                onStderr?.(parsed.text);
              } else if (currentEvent === "exit") {
                exitCode = typeof parsed.exitCode === "number" ? parsed.exitCode : 0;
              }
            } catch (jsonErr) {
              console.warn("SSE json parse error:", jsonErr, currentData);
            }
          }
        }
      }

      return {
        stdout: accumulatedStdout,
        stderr: accumulatedStderr,
        exitCode,
      };
    }
  } catch (streamErr: any) {
    if (streamErr?.name === "AbortError" && signal?.aborted) {
      throw streamErr;
    }
    console.warn("Real-time stream unavailable, checking standard endpoint...");
  }

  // 2. Try standard server endpoint with OpenJDK (local or Vercel serverless /api/run-java)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch("/api/run-java", {
      method: "POST",
      signal: signal || controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, stdin: safeStdin }),
    });
    clearTimeout(timeoutId);

    const contentType = response.headers.get("content-type") || "";
    if (response.ok && contentType.includes("application/json")) {
      const data = await response.json();
      const stdout = data.stdout || "";
      const stderr = data.stderr || "";
      const exitCode = typeof data.exitCode === "number" ? data.exitCode : 0;

      if (stdout) onStdout?.(stdout);
      if (stderr) onStderr?.(stderr);

      return { stdout, stderr, exitCode };
    }
  } catch (serverErr: any) {
    if (serverErr?.name === "AbortError" && signal?.aborted) throw serverErr;
    console.warn("Standard compiler endpoint unreachable, using Wandbox OpenJDK fallback...");
  }

  // 3. Direct client-side fallback to Wandbox OpenJDK 21 with strict UTF-8
  try {
    const sanitizedCode = code.replace(/\bpublic\s+class\s+([A-Za-z0-9_$]+)/g, "class $1");
    const response = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler: "openjdk-jdk-21+35",
        code: sanitizedCode,
        stdin: safeStdin,
        "compiler-option-raw": "-encoding\nUTF-8",
        "runtime-option-raw": "-Dstdout.encoding=UTF-8\n-Dstderr.encoding=UTF-8\n-Dfile.encoding=UTF-8",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const compileErr = (data.compiler_error || data.compiler_message || "").replace(/prog\.java/g, "Main.java");
      const progErr = (data.program_error || "").replace(/prog\.java/g, "Main.java");
      const stdout = data.program_output || "";
      const stderr = (compileErr ? compileErr + "\n" : "") + progErr;
      const exitCode = parseInt(data.status ?? "0", 10);

      if (stdout) onStdout?.(stdout);
      if (stderr.trim()) onStderr?.(stderr.trim() + "\n");

      return {
        stdout,
        stderr: stderr.trim(),
        exitCode,
      };
    }
  } catch (wandboxErr: any) {
    console.error("Wandbox compiler error:", wandboxErr);
  }

  // If all failed to connect
  const connectionErr = "Main.java: error: Unable to connect to OpenJDK compiler service. Please check network connection.\n";
  onStderr?.(connectionErr);
  return {
    stdout: "",
    stderr: connectionErr,
    exitCode: 1,
  };
}

/**
 * Checks if the given Java source code requires standard input (Scanner, System.in, etc.)
 */
export function codeRequiresInput(code: string): boolean {
  if (!code) return false;
  return (
    /\bScanner\b/.test(code) ||
    /System\.in/.test(code) ||
    /BufferedReader\b/.test(code) ||
    /Console\s*=\s*System\.console\(\)/.test(code)
  );
}

/**
 * Standard execution wrapper returning ExecutionResult.
 */
export async function executeJavaCode(
  code: string,
  stdin: string = ""
): Promise<ExecutionResult> {
  const startTime = performance.now();
  const res = await runJavaCodeOnline({ code, stdin });
  const elapsed = Math.round(performance.now() - startTime);

  return {
    success: res.exitCode === 0,
    phase: res.exitCode === 0 ? "runtime" : "compile",
    stdout: res.stdout,
    stderr: res.stderr,
    exitCode: res.exitCode,
    executionTimeMs: elapsed,
    timestamp: Date.now(),
  };
}
