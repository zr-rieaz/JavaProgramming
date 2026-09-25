import React, { useState, useEffect, useRef } from "react";
import {
  Terminal as TerminalIcon,
  Trash2,
  CheckCircle2,
  AlertOctagon,
  Clock,
  Sparkles,
  Copy,
  Check,
  Square,
  CornerDownLeft,
  Lightbulb,
  Code2,
  Keyboard,
  X,
  Play,
} from "lucide-react";
import { JavaErrorExplanation } from "../utils/javaErrorExplainer";
import { copyTextSafely } from "../utils/safeBrowser";

export interface TerminalEntry {
  type: "stdout" | "stderr" | "stdin" | "system";
  text: string;
}

interface TerminalProps {
  entries: TerminalEntry[];
  isExecuting: boolean;
  onClear: () => void;
  onStop?: () => void;
  onSendInput: (text: string) => void;
  onRerunWithInput?: (input?: string) => void;
  customStdin?: string;
  onSetCustomStdin?: (stdin: string) => void;
  onRunCode?: (overrideStdin?: string) => void;
  executionTimeMs?: number;
  exitCode?: number | null;
  errorExplanation?: JavaErrorExplanation | null;
}

export const Terminal: React.FC<TerminalProps> = ({
  entries,
  isExecuting,
  onClear,
  onStop,
  onSendInput,
  onRerunWithInput,
  customStdin = "",
  onSetCustomStdin,
  onRunCode,
  executionTimeMs,
  exitCode,
  errorExplanation,
}) => {
  const [currentInput, setCurrentInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedFix, setCopiedFix] = useState(false);
  const [isInputBoxOpen, setIsInputBoxOpen] = useState(false);
  const [modalInputValue, setModalInputValue] = useState(customStdin || "");
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync modal input value when customStdin changes
  useEffect(() => {
    if (!isInputBoxOpen) {
      setModalInputValue(customStdin || "");
    }
  }, [customStdin, isInputBoxOpen]);

  // Focus modal textarea when opened
  useEffect(() => {
    if (isInputBoxOpen) {
      setTimeout(() => modalTextareaRef.current?.focus(), 50);
    }
  }, [isInputBoxOpen]);

  // Auto-scroll to bottom as output streams in
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries, isExecuting, currentInput]);

  // Focus input automatically while running
  useEffect(() => {
    if (isExecuting) {
      inputRef.current?.focus();
    }
  }, [isExecuting, entries]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isExecuting) return;
      onSendInput(currentInput);
      setCurrentInput("");
    }
  };

  const handleSendClick = () => {
    if (!isExecuting) return;
    onSendInput(currentInput);
    setCurrentInput("");
  };

  const handleCopyOutput = async () => {
    const text = entries.map((e) => e.text).join("");
    const success = await copyTextSafely(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyFix = async (snippet: string) => {
    const success = await copyTextSafely(snippet);
    if (success) {
      setCopiedFix(true);
      setTimeout(() => setCopiedFix(false), 2000);
    }
  };

  const handleModalSubmit = () => {
    if (isExecuting) {
      onSendInput(modalInputValue);
      setIsInputBoxOpen(false);
    } else {
      onSetCustomStdin?.(modalInputValue);
      setIsInputBoxOpen(false);
      if (onRunCode) {
        onRunCode(modalInputValue);
      } else if (onRerunWithInput) {
        onRerunWithInput(modalInputValue);
      }
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-slate-950 border-t md:border-t-0 md:border-l border-slate-800 text-slate-200 overflow-hidden font-mono text-xs select-text">
      {/* Terminal Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 select-none flex-shrink-0">
        <div className="flex items-center space-x-2">
          {/* Mac/Linux-style window dots for authentic terminal feel */}
          <div className="flex items-center space-x-1.5 mr-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <TerminalIcon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span className="text-xs font-semibold text-slate-200">Terminal</span>
          <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">
            OpenJDK 17 / 21
          </span>

          {/* Status Indicator Badge */}
          {isExecuting ? (
            <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-medium animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Running...</span>
            </div>
          ) : exitCode !== undefined && exitCode !== null ? (
            exitCode === 0 ? (
              <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px]">
                <CheckCircle2 className="w-3 h-3" />
                <span>Exit 0</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px]">
                <AlertOctagon className="w-3 h-3" />
                <span>Exit {exitCode}</span>
              </div>
            )
          ) : (
            <span className="text-[10px] text-slate-500">Ready</span>
          )}

          {/* Execution Time */}
          {executionTimeMs !== undefined && !isExecuting && (
            <div className="items-center space-x-1 text-[10px] text-slate-500 hidden sm:flex">
              <Clock className="w-3 h-3" />
              <span>{executionTimeMs} ms</span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-1.5">
          {isExecuting && onStop && (
            <button
              onClick={onStop}
              className="flex items-center space-x-1 px-2 py-0.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[10px] transition cursor-pointer"
              title="Stop Process"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>Stop</span>
            </button>
          )}

          {/* Scanner Input button right next to copy button */}
          <button
            type="button"
            onClick={() => {
              setModalInputValue(customStdin || "");
              setIsInputBoxOpen((prev) => !prev);
            }}
            className={`p-1.5 rounded transition relative flex items-center justify-center cursor-pointer ${
              isExecuting
                ? "text-cyan-400 hover:text-cyan-300 bg-cyan-950/70 border border-cyan-500/60 animate-pulse"
                : customStdin
                ? "text-amber-400 hover:text-amber-300 bg-amber-500/20 border border-amber-500/40"
                : "text-slate-400 hover:text-cyan-300 hover:bg-slate-800"
            }`}
            title="ইনপুট দিন / Scanner Input (বক্স খুলতে ক্লিক করুন)"
          >
            <Keyboard className="w-3.5 h-3.5" />
            {customStdin && !isExecuting && (
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
            )}
          </button>

          {/* Copy Button always visible beside Input Button */}
          <button
            type="button"
            onClick={handleCopyOutput}
            disabled={entries.length === 0}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-35 disabled:hover:bg-transparent disabled:cursor-not-allowed rounded transition cursor-pointer"
            title="কপি করুন / Copy Output"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={onClear}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition cursor-pointer"
            title="Clear Terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Screen */}
      <div
        className="flex-1 p-3 overflow-y-auto font-mono text-xs leading-relaxed w-full cursor-text bg-slate-950 select-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Empty state */}
        {entries.length === 0 && !isExecuting && (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-6 px-4 select-none">
            <p className="text-xs text-slate-300 font-medium mb-1">Terminal Ready</p>
            <p className="text-[11px] text-slate-500 max-w-xs">
              Press the <span className="text-emerald-400 font-semibold">Run</span> button in the editor toolbar or{" "}
              <kbd className="bg-slate-800 text-slate-300 px-1 py-0.5 rounded border border-slate-700 text-[10px]">
                Ctrl + Enter
              </kbd>{" "}
              to compile and execute code with OpenJDK.
            </p>
          </div>
        )}

        {/* Continuous terminal stream with exact whitespace preservation for carets and tabs */}
        <div className="font-mono text-xs leading-relaxed whitespace-pre font-[Consolas,'Courier New',Courier,monospace]">
          {entries.map((entry, index) => {
            if (entry.type === "stdout") {
              return (
                <span key={index} className="text-slate-100">
                  {entry.text}
                </span>
              );
            }
            if (entry.type === "stderr") {
              return (
                <span key={index} className="text-rose-400 whitespace-pre">
                  {entry.text}
                </span>
              );
            }
            if (entry.type === "stdin") {
              return (
                <span key={index} className="text-cyan-300 font-semibold">
                  {entry.text}
                </span>
              );
            }
            if (entry.type === "system") {
              return (
                <span key={index} className="text-slate-400 whitespace-pre">
                  {entry.text}
                </span>
              );
            }
            return null;
          })}

          {/* Inline Input Field sitting directly beside the print output on the same line */}
          {isExecuting && (
            <span className="inline-flex items-center align-baseline ml-1">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder={currentInput ? "" : "ইনপুট লিখুন ↵"}
                className="bg-cyan-950/40 text-cyan-200 placeholder:text-cyan-500/70 border-b-2 border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 rounded-t font-mono text-xs px-1.5 py-0.5 m-0 leading-tight"
                style={{
                  minWidth: "130px",
                  width: `${Math.max(currentInput.length + 1, 14)}ch`,
                }}
                autoFocus
              />
              <button
                onClick={handleSendClick}
                className="ml-1 px-1.5 py-0.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded text-[10px] flex items-center gap-1 transition"
                title="Send Input (Enter)"
              >
                <span>পাঠান</span>
                <CornerDownLeft className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
        </div>

        {/* Beautiful Bengali Recommended Solution Card */}
        {errorExplanation && !isExecuting && (
          <div className="mt-4 bg-gradient-to-b from-slate-900/95 via-slate-900 to-slate-950 border border-rose-500/40 rounded-xl p-4 space-y-3.5 shadow-2xl select-text animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Header: Title & Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-500/20 pb-2.5">
              <div className="flex items-center space-x-2 text-rose-300 font-bold text-sm">
                <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
                <span>সুপারিশকৃত সমাধান (Recommended Solution)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                {errorExplanation.line && (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full text-[10px] font-mono">
                    লাইন {errorExplanation.line}
                  </span>
                )}
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full text-[10px] font-medium">
                  {errorExplanation.category}
                </span>
              </div>
            </div>

            {/* Error Name */}
            <div>
              <h4 className="text-xs font-bold text-amber-300/95 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {errorExplanation.title}
              </h4>
              {/* Faulty Line Snippet if present */}
              {errorExplanation.faultyCodeSnippet && (
                <div className="mt-1.5 text-[11px] bg-rose-950/30 border border-rose-900/40 rounded px-2 py-1 text-rose-300 font-mono flex items-center gap-2">
                  <span className="text-slate-400 select-none">ভুল লাইন:</span>
                  <span className="text-rose-200 font-semibold">{errorExplanation.faultyCodeSnippet}</span>
                </div>
              )}
            </div>

            {/* Detailed Bengali Explanation */}
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              {errorExplanation.explanation}
            </p>

            {/* Step-by-Step Solutions in Bengali */}
            {errorExplanation.solutionSteps && errorExplanation.solutionSteps.length > 0 && (
              <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>সমাধানের পদক্ষেপসমূহ (Steps to Fix):</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-xs font-sans pl-1">
                  {errorExplanation.solutionSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Action Button for NoSuchElementException / Missing Input */}
            {(errorExplanation.title.includes("NoSuchElementException") || errorExplanation.title.includes("ইনপুট")) && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsInputBoxOpen(true)}
                  className="flex items-center space-x-2 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-lg text-xs transition cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                  <span>ইনপুট প্রদান করে পুনরায় রান করুন (Run with Input)</span>
                </button>
              </div>
            )}

            {/* Example Fix / Correct Code Snippet */}
            {errorExplanation.codeTip && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-amber-400" />
                    সঠিক কোডের সমাধান (Example Fix):
                  </span>
                  <button
                    onClick={() => handleCopyFix(errorExplanation.codeTip!)}
                    className="flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 transition"
                  >
                    {copiedFix ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300 font-sans">কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="font-sans">কপি করুন</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-amber-500/20 text-amber-200/90 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                  {errorExplanation.codeTip}
                </pre>
              </div>
            )}
          </div>
        )}

        <div ref={terminalBottomRef} />
      </div>

      {/* Scanner Input Popup Box (Triggered by Keyboard button next to Copy icon) */}
      {isInputBoxOpen && (
        <div
          className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-150"
          onClick={() => setIsInputBoxOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-slate-900 border border-cyan-500/50 rounded-2xl shadow-2xl p-4 flex flex-col space-y-3 font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2 text-cyan-300 font-bold text-xs">
                <Keyboard className="w-4 h-4 text-cyan-400" />
                <span>প্রোগ্রাম ইনপুট (Scanner Input)</span>
              </div>
              <button
                type="button"
                onClick={() => setIsInputBoxOpen(false)}
                className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                title="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction */}
            <div className="text-[11px] text-slate-300 space-y-1">
              <p className="leading-snug">
                {isExecuting ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    প্রোগ্রামটি চলমান রয়েছে (Waiting for Scanner...)
                  </span>
                ) : (
                  <span>
                    জাভায় <code className="bg-slate-800 text-amber-300 px-1 py-0.5 rounded font-mono text-[10px]">Scanner</code> বা <code className="bg-slate-800 text-amber-300 px-1 py-0.5 rounded font-mono text-[10px]">System.in</code> দিয়ে ইনপুট নেওয়ার জন্য এখানে মান লিখুন।
                  </span>
                )}
              </p>
              <p className="text-slate-400 text-[10px]">
                একাধিক ইনপুট দিতে প্রতি লাইনে একটি করে মান লিখুন (Enter চাপুন)।
              </p>
            </div>

            {/* Textarea */}
            <textarea
              ref={modalTextareaRef}
              value={modalInputValue}
              onChange={(e) => setModalInputValue(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  e.preventDefault();
                  handleModalSubmit();
                }
              }}
              placeholder={"উদাহরণ:\n101\nAbdur Rahim\n3.88"}
              rows={4}
              className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg p-2.5 text-xs text-cyan-200 font-mono resize-none focus:outline-none placeholder:text-slate-600"
              autoFocus
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="text-slate-500 mr-1">উদাহরণ:</span>
              <button
                type="button"
                onClick={() => setModalInputValue("101")}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-750 text-cyan-300 border border-slate-700 rounded transition font-mono cursor-pointer"
              >
                101
              </button>
              <button
                type="button"
                onClick={() => setModalInputValue("25\n50")}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-750 text-cyan-300 border border-slate-700 rounded transition font-mono cursor-pointer"
              >
                25, 50
              </button>
              <button
                type="button"
                onClick={() => setModalInputValue("101\nAbdur Rahim\n3.875")}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-750 text-cyan-300 border border-slate-700 rounded transition font-mono cursor-pointer"
              >
                Student Data
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setModalInputValue("");
                  onSetCustomStdin?.("");
                }}
                className="text-[11px] text-slate-500 hover:text-rose-400 transition cursor-pointer"
              >
                ইনপুট মুছুন
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsInputBoxOpen(false)}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 transition cursor-pointer"
                >
                  বাতিল
                </button>

                {isExecuting ? (
                  <button
                    type="button"
                    onClick={handleModalSubmit}
                    className="flex items-center space-x-1.5 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs transition shadow cursor-pointer active:scale-95"
                  >
                    <span>ইনপুট পাঠান</span>
                    <CornerDownLeft className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleModalSubmit}
                    className="flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg text-xs transition shadow cursor-pointer active:scale-95"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>রান করুন (Run)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
