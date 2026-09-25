import React from "react";
import { BookOpen, Code2, FileCode, Terminal as TerminalIcon, Search, Menu } from "lucide-react";
import { ViewMode } from "../types";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenSearch: () => void;
  onToggleMobileDrawer: () => void;
  isExecuting?: boolean;
  exitCode?: number | null;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
  onOpenSearch,
  onToggleMobileDrawer,
  isExecuting,
  exitCode,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white px-3 py-2 flex items-center justify-between sticky top-0 z-30 shadow-md w-full flex-shrink-0">
      {/* Left: Menu & Brand */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleMobileDrawer}
          className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg md:hidden transition active:scale-95"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-orange-500/20 flex-shrink-0">
          ☕
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className="text-sm font-bold tracking-tight text-white truncate max-w-[120px] sm:max-w-none">
              Java Master Pro
            </span>
            <span className="text-[9px] uppercase font-bold tracking-wider bg-orange-500/20 text-orange-400 px-1 py-0.2 rounded border border-orange-500/30">
              JDK 17
            </span>
          </div>
        </div>
      </div>

      {/* Center/Right: Primary Navigation Tabs (Chapters, Programs, Code Editor, and Terminal right beside it) */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <div className="flex items-center bg-slate-800/90 p-0.5 sm:p-1 rounded-xl border border-slate-700/60">
          {/* Chapters */}
          <button
            onClick={() => onViewModeChange("book")}
            className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              viewMode === "book"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
            title="Chapters"
          >
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">Chapters</span>
          </button>
          {/* 105 Programs */}
          <button
            onClick={() => onViewModeChange("programs")}
            className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              viewMode === "programs"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
            title="105 Programs"
          >
            <Code2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">Programs</span>
          </button>
          {/* Code Editor */}
          <button
            onClick={() => onViewModeChange("editor")}
            className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              viewMode === "editor" || viewMode === "playground"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
            title="Code Editor"
          >
            <FileCode className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">Code Editor</span>
          </button>
          {/* Terminal (right beside Code Editor) */}
          <button
            onClick={() => onViewModeChange("terminal")}
            className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              viewMode === "terminal"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
            title="Terminal"
          >
            <TerminalIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">Terminal</span>
            {isExecuting ? (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping ml-0.5" />
            ) : exitCode !== undefined && exitCode !== null ? (
              <span
                className={`w-1.5 h-1.5 rounded-full ml-0.5 ${
                  exitCode === 0 ? "bg-emerald-400" : "bg-rose-400"
                }`}
              />
            ) : null}
          </button>
        </div>

        <button
          onClick={onOpenSearch}
          className="p-1.5 sm:px-2 sm:py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs border border-slate-700 transition flex items-center space-x-1.5 cursor-pointer"
          title="Search Chapters and Programs"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline">Search</span>
        </button>
      </div>
    </header>
  );
};
