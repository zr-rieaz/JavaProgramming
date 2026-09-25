import React, { useState } from "react";
import {
  BookOpen,
  Code2,
  Bookmark,
  Search,
  X,
  ChevronRight,
} from "lucide-react";
import { JavaProgram, ViewMode } from "../types";
import { javaChapters } from "../data/chaptersData";
import { allPrograms } from "../data/programsData";
import { safeStorage } from "../utils/safeBrowser";

interface SidebarProps {
  currentChapterId: number;
  onSelectChapter: (id: number) => void;
  currentProgramId: string;
  onSelectProgram: (prog: JavaProgram) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentChapterId,
  onSelectChapter,
  currentProgramId,
  onSelectProgram,
  viewMode,
  onViewModeChange,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [activeTab, setActiveTab] = useState<"chapters" | "programs" | "cheatsheet">(() => {
    try {
      const saved = safeStorage.getItem("sidebar_active_tab");
      if (saved === "chapters" || saved === "programs" || saved === "cheatsheet") {
        return saved;
      }
    } catch {}
    return viewMode === "programs" ? "programs" : "chapters";
  });
  const [progSearch, setProgSearch] = useState(() => {
    try {
      return safeStorage.getItem("sidebar_prog_search") || "";
    } catch {}
    return "";
  });
  const [chapterFilter, setChapterFilter] = useState<number | "all">(() => {
    try {
      const saved = safeStorage.getItem("sidebar_chapter_filter");
      if (saved) return saved === "all" ? "all" : Number(saved);
    } catch {}
    return "all";
  });

  const handleTabChange = (tab: "chapters" | "programs" | "cheatsheet") => {
    setActiveTab(tab);
    safeStorage.setItem("sidebar_active_tab", tab);
  };

  const handleProgSearchChange = (val: string) => {
    setProgSearch(val);
    safeStorage.setItem("sidebar_prog_search", val);
  };

  const handleChapterFilterChange = (filter: number | "all") => {
    setChapterFilter(filter);
    safeStorage.setItem("sidebar_chapter_filter", String(filter));
  };

  const filteredPrograms = allPrograms.filter((p) => {
    const matchesSearch =
      !progSearch ||
      p.title.toLowerCase().includes(progSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(progSearch.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(progSearch.toLowerCase()));
    const matchesChapter = chapterFilter === "all" || p.chapter === chapterFilter;
    return matchesSearch && matchesChapter;
  });

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 select-none w-72 sm:w-80 max-w-full">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 p-2">
        <div className="flex space-x-1 flex-1">
          <button
            onClick={() => {
              handleTabChange("chapters");
              onViewModeChange("book");
            }}
            className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1 transition ${
              activeTab === "chapters"
                ? "bg-slate-800 text-amber-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Chapters</span>
          </button>
          <button
            onClick={() => {
              handleTabChange("programs");
              onViewModeChange("programs");
            }}
            className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1 transition ${
              activeTab === "programs"
                ? "bg-slate-800 text-amber-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>105 Code</span>
          </button>
          <button
            onClick={() => handleTabChange("cheatsheet")}
            className={`py-1.5 px-2.5 text-xs font-semibold rounded-lg flex items-center justify-center transition ${
              activeTab === "cheatsheet"
                ? "bg-slate-800 text-amber-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Cheat Sheet"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>
        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg md:hidden ml-1"
          title="Close Sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tab 1: Chapters List */}
      {activeTab === "chapters" && (
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {javaChapters.map((ch) => {
            const isSelected = ch.id === currentChapterId;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  onSelectChapter(ch.id);
                  onViewModeChange("book");
                  onCloseMobile();
                }}
                className={`w-full text-left p-2.5 rounded-xl transition flex items-start space-x-2.5 ${
                  isSelected
                    ? "bg-amber-500/15 border border-amber-500/40 text-white"
                    : "hover:bg-slate-800/60 text-slate-300 border border-transparent"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isSelected
                      ? "bg-amber-500 text-slate-950 font-black"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {ch.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate leading-snug">
                    {ch.title}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>{ch.readingTime || "15 min"}</span>
                    <span>•</span>
                    <span>{ch.topics.length} Topics</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Tab 2: 105 Verified Programs */}
      {activeTab === "programs" && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search & Filter */}
          <div className="p-2 border-b border-slate-800 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={progSearch}
                onChange={(e) => handleProgSearchChange(e.target.value)}
                placeholder="Search programs (e.g. Prime, OOP)..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <select
              value={chapterFilter}
              onChange={(e) =>
                handleChapterFilterChange(
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Chapters ({allPrograms.length} Programs)</option>
              {javaChapters.map((c) => (
                <option key={c.id} value={c.id}>
                  Chapter {c.id}: {c.title.replace(/^Chapter \d+:\s*/, "")}
                </option>
              ))}
            </select>
          </div>

          {/* Program list */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredPrograms.length === 0 ? (
              <div className="text-center text-slate-500 text-xs py-8">
                No matching programs found
              </div>
            ) : (
              filteredPrograms.map((prog) => {
                const isSelected = prog.id === currentProgramId;
                const difficultyColor =
                  prog.difficulty === "beginner"
                    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                    : prog.difficulty === "intermediate"
                    ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                    : "text-rose-400 bg-rose-500/10 border-rose-500/20";
                return (
                  <button
                    key={prog.id}
                    onClick={() => {
                      onSelectProgram(prog);
                      onCloseMobile();
                    }}
                    className={`w-full text-left p-2 rounded-lg transition flex items-start space-x-2 ${
                      isSelected
                        ? "bg-amber-500/15 border border-amber-500/40 text-white"
                        : "hover:bg-slate-800/60 text-slate-300 border border-transparent"
                    }`}
                  >
                    <div className="text-[11px] font-mono text-slate-500 font-bold w-6 pt-0.5">
                      #{prog.id.replace("prog-", "")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">
                        {prog.title}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded border uppercase font-bold tracking-wider ${difficultyColor}`}
                        >
                          {prog.difficulty}
                        </span>
                        <span className="text-[9px] text-slate-500">
                          Ch {prog.chapter}
                        </span>
                        <span className="text-[9px] text-slate-500 truncate">
                          {prog.category}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Cheat Sheet */}
      {activeTab === "cheatsheet" && (
        <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <h4 className="font-bold text-amber-400 mb-1.5">8 Primitive Data Types</h4>
            <div className="space-y-1 text-slate-300 text-[11px]">
              <div>• <code>byte</code> (1 byte, -128 to 127)</div>
              <div>• <code>short</code> (2 bytes, -32,768 to 32,767)</div>
              <div>• <code>int</code> (4 bytes, ~2.1 billion)</div>
              <div>• <code>long</code> (8 bytes, suffix 'L')</div>
              <div>• <code>float</code> (4 bytes, suffix 'f')</div>
              <div>• <code>double</code> (8 bytes, standard)</div>
              <div>• <code>char</code> (2 bytes Unicode, 'A')</div>
              <div>• <code>boolean</code> (true / false)</div>
            </div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <h4 className="font-bold text-emerald-400 mb-1.5">Access Modifiers</h4>
            <div className="space-y-1 text-slate-300 text-[11px]">
              <div>• <code>public</code> : Accessible everywhere</div>
              <div>• <code>protected</code> : Same package & subclasses</div>
              <div>• <code>default</code> : Same package only</div>
              <div>• <code>private</code> : Declaring class only</div>
            </div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <h4 className="font-bold text-sky-400 mb-1.5">OOP Principles</h4>
            <div className="space-y-1 text-slate-300 text-[11px]">
              <div>• <b>Encapsulation:</b> private fields + getters/setters</div>
              <div>• <b>Inheritance:</b> extends keyword (single class)</div>
              <div>• <b>Polymorphism:</b> Method overloading & overriding</div>
              <div>• <b>Abstraction:</b> abstract class & interface</div>
            </div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <h4 className="font-bold text-purple-400 mb-1.5">Keyboard Shortcuts</h4>
            <div className="space-y-1 text-slate-300 text-[11px]">
              <div>• <kbd className="bg-slate-800 px-1 rounded">Ctrl + Enter</kbd> : Run Code</div>
              <div>• <kbd className="bg-slate-800 px-1 rounded">Tab</kbd> : 4 Spaces Indent</div>
              <div>• <kbd className="bg-slate-800 px-1 rounded">Ctrl + K</kbd> : Quick Search</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex h-full flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Slide-over overlay on Android/phones) */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Drawer content */}
          <div className="relative z-10 w-4/5 max-w-xs h-full bg-slate-900 shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
