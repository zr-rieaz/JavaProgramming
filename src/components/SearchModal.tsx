import React, { useState, useEffect, useRef } from "react";
import { Search, X, BookOpen, Code2, ArrowRight } from "lucide-react";
import { JavaProgram } from "../types";
import { searchChapters } from "../data/chaptersData";
import { searchPrograms } from "../data/programsData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (id: number) => void;
  onSelectProgram: (prog: JavaProgram) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectChapter,
  onSelectProgram,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedChapters = searchChapters(query);
  const matchedPrograms = searchPrograms(query).slice(0, 10);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-12 sm:pt-16 px-3">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters, topics, or 105 verified programs..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-500 hover:text-slate-300 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Chapters Section */}
          {matchedChapters.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>Chapters ({matchedChapters.length})</span>
              </div>
              <div className="space-y-1">
                {matchedChapters.map(({ chapter }) => (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      onSelectChapter(chapter.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-400">
                        {chapter.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {chapter.topics.length} topics • {chapter.readingTime || "15 min"}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Programs Section */}
          {matchedPrograms.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Verified Programs ({matchedPrograms.length})</span>
              </div>
              <div className="space-y-1">
                {matchedPrograms.map((prog) => (
                  <button
                    key={prog.id}
                    onClick={() => {
                      onSelectProgram(prog);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-400 truncate">
                        #{prog.id.replace("prog-", "")} {prog.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Chapter {prog.chapter} • {prog.category} • {prog.difficulty}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 flex-shrink-0 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedChapters.length === 0 && matchedPrograms.length === 0 && query && (
            <div className="text-center py-12 text-slate-500 text-xs">
              No results found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
