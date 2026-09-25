import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { CodeEditor } from "./components/CodeEditor";
import { Terminal, TerminalEntry } from "./components/Terminal";
import { ChapterViewer } from "./components/ChapterViewer";
import { SearchModal } from "./components/SearchModal";
import { ProgramInputModal } from "./components/ProgramInputModal";
import { ViewMode, JavaProgram } from "./types";
import { allPrograms } from "./data/programsData";
import { javaChapters } from "./data/chaptersData";
import { runJavaCodeOnline, codeRequiresInput } from "./utils/javaRunner";
import { explainJavaError, JavaErrorExplanation } from "./utils/javaErrorExplainer";
import { safeStorage } from "./utils/safeBrowser";
import { Code2, Play, BookOpen, Sparkles, Filter } from "lucide-react";

const STORAGE_KEY = "java_master_pro_app_state_v1";

interface SavedAppState {
  viewMode?: ViewMode;
  currentChapterId?: number;
  currentProgramId?: string;
  code?: string;
  activeCodeTitle?: string;
  originalCode?: string;
  customStdin?: string;
  terminalEntries?: TerminalEntry[];
  exitCode?: number | null;
  executionTimeMs?: number;
  programSearch?: string;
  selectedCategory?: string;
  selectedDifficulty?: string;
  selectedChapterFilter?: number | "All";
}

function getSavedState(): SavedAppState | null {
  try {
    const raw = safeStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Failed to load saved state:", e);
  }
  return null;
}

export function App() {
  const savedState = React.useMemo(() => getSavedState(), []);

  // Navigation & View State
  const [viewMode, setViewMode] = useState<ViewMode>(
    () => savedState?.viewMode || "book"
  );
  const [currentChapterId, setCurrentChapterId] = useState<number>(
    () => savedState?.currentChapterId || 1
  );
  const [currentProgram, setCurrentProgram] = useState<JavaProgram>(() => {
    if (savedState?.currentProgramId) {
      const found = allPrograms.find((p) => p.id === savedState.currentProgramId);
      if (found) return found;
    }
    return allPrograms[0];
  });
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Programs Grid Filter State
  const [programSearch, setProgramSearch] = useState(
    () => savedState?.programSearch || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => savedState?.selectedCategory || "All"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
    () => savedState?.selectedDifficulty || "All"
  );
  const [selectedChapterFilter, setSelectedChapterFilter] = useState<number | "All">(
    () => (savedState?.selectedChapterFilter !== undefined ? savedState.selectedChapterFilter : "All")
  );
  const programsContainerRef = React.useRef<HTMLDivElement>(null);

  // Restore programs grid scroll position on mount/view change
  React.useEffect(() => {
    if (viewMode === "programs" && programsContainerRef.current) {
      const saved = safeStorage.getItem("programs_grid_scroll");
      if (saved) {
        const top = parseInt(saved, 10);
        if (!isNaN(top) && top > 0) {
          setTimeout(() => {
            if (programsContainerRef.current) {
              programsContainerRef.current.scrollTop = top;
            }
          }, 60);
        }
      }
    }
  }, [viewMode]);

  // Code Editor State
  const [code, setCode] = useState<string>(
    () => savedState?.code || allPrograms[0].code
  );
  const [activeCodeTitle, setActiveCodeTitle] = useState<string>(
    () => savedState?.activeCodeTitle || allPrograms[0].title
  );
  const [originalCode, setOriginalCode] = useState<string>(
    () => savedState?.originalCode || allPrograms[0].code
  );
  const [customStdin, setCustomStdin] = useState<string>(
    () => (savedState?.customStdin !== undefined ? savedState.customStdin : allPrograms[0].sampleInput || "")
  );
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);

  // Terminal & Execution State
  const [terminalEntries, setTerminalEntries] = useState<TerminalEntry[]>(() => {
    if (savedState?.terminalEntries && savedState.terminalEntries.length > 0) {
      return savedState.terminalEntries;
    }
    return [
      {
        type: "system",
        text: "☕ Java Master Pro Interactive Terminal [JDK 17]\nReady to compile and execute Java code.\n",
      },
    ];
  });
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [exitCode, setExitCode] = useState<number | null>(
    () => (savedState?.exitCode !== undefined ? savedState.exitCode : null)
  );
  const [executionTimeMs, setExecutionTimeMs] = useState<number | undefined>(
    () => savedState?.executionTimeMs
  );
  const [errorExplanation, setErrorExplanation] = useState<JavaErrorExplanation | null>(null);

  // Auto-persist state to safeStorage on every change
  useEffect(() => {
    try {
      const stateToSave: SavedAppState = {
        viewMode,
        currentChapterId,
        currentProgramId: currentProgram.id,
        code,
        activeCodeTitle,
        originalCode,
        customStdin,
        terminalEntries: terminalEntries.slice(-80), // keep latest 80 terminal entries to avoid storage issues
        exitCode,
        executionTimeMs,
        programSearch,
        selectedCategory,
        selectedDifficulty,
        selectedChapterFilter,
      };
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn("Failed to save state to storage:", e);
    }
  }, [
    viewMode,
    currentChapterId,
    currentProgram,
    code,
    activeCodeTitle,
    originalCode,
    customStdin,
    terminalEntries,
    exitCode,
    executionTimeMs,
    programSearch,
    selectedCategory,
    selectedDifficulty,
    selectedChapterFilter,
  ]);

  // Ref to cancel/abort in-flight execution if needed
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const activeSessionIdRef = React.useRef<string | null>(null);
  const pendingInputResolverRef = React.useRef<((input: string) => void) | null>(null);

  // Load a program into the editor
  const handleSelectProgram = (prog: JavaProgram) => {
    setCurrentProgram(prog);
    setCurrentChapterId(prog.chapter);
    setCode(prog.code);
    setOriginalCode(prog.code);
    setActiveCodeTitle(prog.title);
    setCustomStdin(prog.sampleInput || "");
    setViewMode("editor");
  };

  // Load chapter example snippet into editor
  const handleLoadSnippetToEditor = (snippetCode: string, snippetTitle: string) => {
    setCode(snippetCode);
    setOriginalCode(snippetCode);
    setActiveCodeTitle(snippetTitle);
    setCustomStdin("");
    setViewMode("editor");
  };

  // Reset editor back to program template
  const handleResetCode = () => {
    setCode(originalCode);
    setCustomStdin(currentProgram?.sampleInput || "");
  };

  // Clear Terminal
  const handleClearTerminal = () => {
    setTerminalEntries([]);
    setErrorExplanation(null);
    setExitCode(null);
  };

  // Stop Execution
  const handleStopExecution = async () => {
    const sessionId = activeSessionIdRef.current;
    if (sessionId) {
      try {
        fetch("/api/run-java/stop", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        }).catch(() => {});
      } catch {}
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    activeSessionIdRef.current = null;
    if (pendingInputResolverRef.current) {
      pendingInputResolverRef.current("");
      pendingInputResolverRef.current = null;
    }
    setIsExecuting(false);
    setTerminalEntries((prev) => [
      ...prev,
      { type: "system", text: "\n[Process Terminated by User]\n" },
    ]);
  };

  // Send interactive stdin input
  const handleSendInput = async (text: string) => {
    // Append entered text visually to terminal with newline
    setTerminalEntries((prev) => [...prev, { type: "stdin", text: text + "\n" }]);

    const sessionId = activeSessionIdRef.current;
    if (sessionId) {
      try {
        await fetch("/api/run-java/input", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, input: text + "\n" }),
        });
      } catch (err) {
        console.error("Failed to send terminal input:", err);
      }
    }

    if (pendingInputResolverRef.current) {
      pendingInputResolverRef.current(text);
      pendingInputResolverRef.current = null;
    }
  };

  // Core execution engine
  const executeWithStdin = async (inputToUse?: unknown) => {
    if (isExecuting) return;

    const safeInput = typeof inputToUse === "string" ? inputToUse : (typeof customStdin === "string" ? customStdin : "");
    if (typeof inputToUse === "string") {
      setCustomStdin(inputToUse);
    }

    // Switch view to terminal on mobile, or ensure terminal is visible
    if (window.innerWidth < 768 && viewMode !== "terminal") {
      setViewMode("terminal");
    }

    setIsExecuting(true);
    setErrorExplanation(null);
    setExitCode(null);

    // Initial system entry
    setTerminalEntries((prev) => [
      ...prev,
      {
        type: "system",
        text: `\n$ javac Main.java && java Main\n`,
      },
    ]);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    activeSessionIdRef.current = null;

    const startTime = performance.now();
    const normalizedStdin = safeInput && !safeInput.endsWith("\n") ? safeInput + "\n" : (safeInput || "");

    try {
      let hasReceivedStderr = false;
      const result = await runJavaCodeOnline({
        code,
        stdin: normalizedStdin,
        signal: abortController.signal,
        onSession: (sessionId: string) => {
          activeSessionIdRef.current = sessionId;
        },
        onStdout: (chunk: string) => {
          setTerminalEntries((prev) => [...prev, { type: "stdout", text: chunk }]);
        },
        onStderr: (chunk: string) => {
          hasReceivedStderr = true;
          setTerminalEntries((prev) => [...prev, { type: "stderr", text: chunk }]);
        },
        onPromptInput: async (promptMsg?: string) => {
          if (promptMsg) {
            setTerminalEntries((prev) => [...prev, { type: "stdout", text: promptMsg }]);
          }
          return new Promise<string>((resolve) => {
            pendingInputResolverRef.current = resolve;
          });
        },
      });

      const elapsed = Math.round(performance.now() - startTime);
      setExecutionTimeMs(elapsed);
      setExitCode(result.exitCode);

      if (result.exitCode === 0) {
        setTerminalEntries((prev) => [
          ...prev,
          {
            type: "system",
            text: `\n[Process completed successfully with exit code 0 (${elapsed}ms)]\n`,
          },
        ]);
      } else {
        const fullStderr = (result.stderr || result.stdout || "Compilation or runtime error occurred.").trim();
        const explanation = explainJavaError(fullStderr, code);
        setErrorExplanation(explanation);

        setTerminalEntries((prev) => {
          const next = [...prev];
          if (!hasReceivedStderr && fullStderr) {
            next.push({ type: "stderr", text: fullStderr + "\n" });
          }
          next.push({
            type: "system",
            text: `\n[Process exited with error code ${result.exitCode ?? 1}]\n`,
          });
          return next;
        });
      }
    } catch (err: any) {
      const elapsed = Math.round(performance.now() - startTime);
      setExecutionTimeMs(elapsed);
      setExitCode(1);
      const errMsg = err?.message || String(err);
      setTerminalEntries((prev) => [
        ...prev,
        { type: "stderr", text: `Runtime Exception: ${errMsg}\n` },
      ]);
      const explanation = explainJavaError(errMsg, code);
      setErrorExplanation(explanation);
    } finally {
      setIsExecuting(false);
      abortControllerRef.current = null;
      pendingInputResolverRef.current = null;
    }
  };

  // Run Code via compilation engine (checks if input is needed first)
  const handleRunCode = (overrideStdin?: unknown) => {
    if (isExecuting) return;

    const stdinOverride = typeof overrideStdin === "string" ? overrideStdin : undefined;
    const stdinToUse = stdinOverride !== undefined ? stdinOverride : (typeof customStdin === "string" ? customStdin : "");
    const needsInput = codeRequiresInput(code);

    // If code requires input and no input has been provided yet:
    if (needsInput && !stdinToUse && stdinOverride === undefined) {
      if (currentProgram?.sampleInput) {
        setCustomStdin(currentProgram.sampleInput);
        executeWithStdin(currentProgram.sampleInput);
        return;
      }
      setIsInputModalOpen(true);
      return;
    }

    executeWithStdin(stdinToUse);
  };

  // Keyboard shortcut: Ctrl + Enter to run code
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [code, isExecuting]);

  // Extract unique categories for 105 Programs
  const allCategories = ["All", ...Array.from(new Set(allPrograms.map((p) => p.category)))];

  // Filter 105 programs
  const displayedPrograms = allPrograms.filter((p) => {
    const matchesSearch =
      !programSearch ||
      p.title.toLowerCase().includes(programSearch.toLowerCase()) ||
      p.bengaliTitle.toLowerCase().includes(programSearch.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(programSearch.toLowerCase())) ||
      p.code.toLowerCase().includes(programSearch.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
    const matchesChapter = selectedChapterFilter === "All" || p.chapter === selectedChapterFilter;
    return matchesSearch && matchesCategory && matchesDifficulty && matchesChapter;
  });

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Top Header */}
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileDrawer={() => setIsMobileDrawerOpen((prev) => !prev)}
        isExecuting={isExecuting}
        exitCode={exitCode}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar (Chapters, 105 Code, CheatSheet) */}
        <Sidebar
          currentChapterId={currentChapterId}
          onSelectChapter={setCurrentChapterId}
          currentProgramId={currentProgram.id}
          onSelectProgram={handleSelectProgram}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          isOpenMobile={isMobileDrawerOpen}
          onCloseMobile={() => setIsMobileDrawerOpen(false)}
        />

        {/* Dynamic Center/Right Views */}
        <main className="flex-1 flex overflow-hidden relative">
          {/* VIEW 1: Chapters Interactive Dropdown Book */}
          {viewMode === "book" && (
            <ChapterViewer
              currentChapterId={currentChapterId}
              onSelectChapter={setCurrentChapterId}
              onLoadCodeToEditor={handleLoadSnippetToEditor}
            />
          )}

          {/* VIEW 2: 105 Verified Programs Explorer Grid */}
          {viewMode === "programs" && (
            <div
              ref={programsContainerRef}
              onScroll={(e) => {
                safeStorage.setItem("programs_grid_scroll", String(e.currentTarget.scrollTop));
              }}
              className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-950 text-slate-100 w-full max-w-6xl mx-auto space-y-6"
            >
              {/* Header Banner */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Code2 className="w-4 h-4" />
                    <span>(105 Programs Library)</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">
                    105 Verified Java Programs
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Complete with verified source code, explanations, and key learning points.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 text-center">
                    <div className="text-base sm:text-lg font-bold text-amber-400">
                      {allPrograms.length}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">
                      Programs
                    </div>
                  </div>
                  <div className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 text-center">
                    <div className="text-base sm:text-lg font-bold text-emerald-400">15</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">
                      Chapters
                    </div>
                  </div>
                  <div className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 text-center">
                    <div className="text-base sm:text-lg font-bold text-sky-400">100%</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">
                      Verified
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter & Search Controls */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    value={programSearch}
                    onChange={(e) => setProgramSearch(e.target.value)}
                    placeholder="Search 105 programs by name, topic, or keyword..."
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                    >
                      <option value="All">All Difficulties</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    <select
                      value={selectedChapterFilter}
                      onChange={(e) =>
                        setSelectedChapterFilter(
                          e.target.value === "All" ? "All" : Number(e.target.value)
                        )
                      }
                      className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 max-w-[160px]"
                    >
                      <option value="All">All Chapters</option>
                      {javaChapters.map((c) => (
                        <option key={c.id} value={c.id}>
                          Ch {c.id}: {c.title.replace(/^Chapter \d+:\s*/, "")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
                  <span className="text-[11px] text-slate-400 mr-1 flex items-center gap-1">
                    <Filter className="w-3 h-3" /> Category:
                  </span>
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition flex-shrink-0 cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-amber-600 text-white shadow-sm"
                          : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Programs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pb-10">
                {displayedPrograms.map((prog) => {
                  const difficultyColor =
                    prog.difficulty === "beginner"
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : prog.difficulty === "intermediate"
                      ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                      : "text-rose-400 bg-rose-500/10 border-rose-500/20";

                  return (
                    <div
                      key={prog.id}
                      className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 transition flex flex-col justify-between space-y-3 group shadow-sm hover:shadow-md"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-500 font-bold">
                            #{prog.id.replace("prog-", "")}
                          </span>
                          <div className="flex items-center space-x-1.5">
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded border uppercase font-bold tracking-wider ${difficultyColor}`}
                            >
                              {prog.difficulty}
                            </span>
                            <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded border border-slate-700">
                              Ch {prog.chapter}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition leading-snug">
                            {prog.title}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {prog.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 truncate max-w-[120px]">
                          {prog.category}
                        </span>
                        <button
                          onClick={() => handleSelectProgram(prog)}
                          className="flex items-center space-x-1 px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition cursor-pointer active:scale-95"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Run Code</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 3 & 4: Code Editor & Terminal (Split on Desktop, Tabbed on Mobile) */}
          {(viewMode === "editor" || viewMode === "playground" || viewMode === "terminal") && (
            <div className="flex-1 flex flex-col md:flex-row h-full w-full overflow-hidden">
              {/* Left Pane: Code Editor */}
              <div
                className={`flex-1 h-full overflow-hidden ${
                  viewMode === "terminal" ? "hidden md:flex" : "flex"
                }`}
              >
                <CodeEditor
                  code={code}
                  onChange={setCode}
                  onRun={() => handleRunCode()}
                  onReset={handleResetCode}
                  isExecuting={isExecuting}
                  fileName="Main.java"
                  subtitle={activeCodeTitle}
                />
              </div>

              {/* Right Pane: Interactive Terminal */}
              <div
                className={`w-full md:w-80 lg:w-96 xl:w-[440px] h-full overflow-hidden ${
                  viewMode === "editor" || viewMode === "playground" ? "hidden md:flex" : "flex"
                }`}
              >
                <Terminal
                  entries={terminalEntries}
                  isExecuting={isExecuting}
                  onClear={handleClearTerminal}
                  onStop={handleStopExecution}
                  onSendInput={handleSendInput}
                  onRerunWithInput={(input) => handleRunCode(input)}
                  customStdin={customStdin}
                  onSetCustomStdin={setCustomStdin}
                  onRunCode={(input) => handleRunCode(input)}
                  executionTimeMs={executionTimeMs}
                  exitCode={exitCode}
                  errorExplanation={errorExplanation}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Program Input Modal (for Scanner / System.in inputs) */}
      <ProgramInputModal
        isOpen={isInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
        initialValue={customStdin || currentProgram?.sampleInput || ""}
        onSubmit={(inputVal) => {
          setIsInputModalOpen(false);
          setCustomStdin(inputVal);
          executeWithStdin(inputVal);
        }}
        onRunWithoutInput={() => {
          setIsInputModalOpen(false);
          setCustomStdin("");
          executeWithStdin("");
        }}
      />

      {/* Global Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectChapter={(id) => {
          setCurrentChapterId(id);
          setViewMode("book");
        }}
        onSelectProgram={handleSelectProgram}
      />
    </div>
  );
}

export default App;
