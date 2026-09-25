import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ChevronDown,
  ChevronUp,
  Play,
  Lightbulb,
  AlertTriangle,
  Code2,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Clock,
  Layers,
} from "lucide-react";
import { Chapter } from "../types";
import { javaChapters } from "../data/chaptersData";
import { safeStorage } from "../utils/safeBrowser";

interface ChapterViewerProps {
  currentChapterId: number;
  onSelectChapter: (id: number) => void;
  onLoadCodeToEditor: (code: string, title: string) => void;
}

export const ChapterViewer: React.FC<ChapterViewerProps> = ({
  currentChapterId,
  onSelectChapter,
  onLoadCodeToEditor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the selected chapter (default to first if not found)
  const currentChapter: Chapter =
    javaChapters.find((ch) => ch.id === currentChapterId) || javaChapters[0];

  const prevChapter = javaChapters.find((ch) => ch.id === currentChapter.id - 1);
  const nextChapter = javaChapters.find((ch) => ch.id === currentChapter.id + 1);

  // All topics of the active chapter open by default for effortless reading
  const [openTopicIds, setOpenTopicIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = safeStorage.getItem(`chapter_${currentChapter.id}_topics`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    const initial: Record<string, boolean> = {};
    currentChapter.topics.forEach((t) => {
      initial[t.id] = true;
    });
    return initial;
  });

  const isInitialMount = useRef(true);

  // Restore scroll position or scroll to top on chapter change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const savedScroll = safeStorage.getItem(`chapter_${currentChapter.id}_scroll`);
      if (savedScroll && containerRef.current) {
        const top = parseInt(savedScroll, 10);
        if (!isNaN(top) && top > 0) {
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.scrollTop = top;
            }
          }, 80);
        }
      }
      return;
    }

    // When user switches chapter, check if they had a previous scroll in that chapter or start top
    const savedScroll = safeStorage.getItem(`chapter_${currentChapter.id}_scroll`);
    if (containerRef.current) {
      if (savedScroll) {
        containerRef.current.scrollTop = parseInt(savedScroll, 10) || 0;
      } else {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    try {
      const savedTopics = safeStorage.getItem(`chapter_${currentChapter.id}_topics`);
      if (savedTopics) {
        setOpenTopicIds(JSON.parse(savedTopics));
      } else {
        const updated: Record<string, boolean> = {};
        currentChapter.topics.forEach((t) => {
          updated[t.id] = true;
        });
        setOpenTopicIds(updated);
      }
    } catch (e) {}
  }, [currentChapterId, currentChapter.id]);

  // Persist open topics on toggle
  useEffect(() => {
    try {
      safeStorage.setItem(`chapter_${currentChapter.id}_topics`, JSON.stringify(openTopicIds));
    } catch (e) {}
  }, [openTopicIds, currentChapter.id]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop;
    safeStorage.setItem(`chapter_${currentChapter.id}_scroll`, String(top));
  };

  const toggleTopic = (topicId: string) => {
    setOpenTopicIds((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const expandAllTopics = () => {
    const updated: Record<string, boolean> = {};
    currentChapter.topics.forEach((t) => {
      updated[t.id] = true;
    });
    setOpenTopicIds(updated);
  };

  const collapseAllTopics = () => {
    setOpenTopicIds({});
  };

  // Custom styling for textbook-grade Markdown components
  const markdownComponents = {
    h1: ({ children }: any) => (
      <h1 className="text-base sm:text-lg font-bold text-amber-300 mt-4 mb-2 pb-1 border-b border-slate-800">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-sm sm:text-base font-bold text-amber-400 mt-3.5 mb-2">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xs sm:text-sm font-bold text-amber-200 mt-3 mb-1.5">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xs font-semibold text-slate-200 mt-2 mb-1">
        {children}
      </h4>
    ),
    p: ({ children }: any) => (
      <p className="text-slate-300 leading-relaxed my-2 text-xs sm:text-sm">
        {children}
      </p>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-amber-300">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-slate-200">{children}</em>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-1 my-2 text-slate-300 pl-1 text-xs sm:text-sm leading-relaxed">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-1 my-2 text-slate-300 pl-1 text-xs sm:text-sm leading-relaxed">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="text-slate-300 leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-amber-500/70 bg-amber-500/10 pl-3 py-1.5 my-2.5 rounded-r text-slate-200 italic text-xs sm:text-sm">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-3.5 border-slate-800" />,
    pre: ({ children }: any) => <>{children}</>,
    code: ({ className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      const codeText = String(children).replace(/\n$/, "");
      const isMultiLine = codeText.includes("\n") || Boolean(match);

      if (isMultiLine) {
        return (
          <div className="my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="font-mono text-amber-400/90 font-semibold">
                {match ? match[1].toUpperCase() : "JAVA"}
              </span>
              <button
                type="button"
                onClick={() => onLoadCodeToEditor(codeText, "Snippet")}
                className="text-amber-400 hover:text-amber-300 transition text-[11px] flex items-center gap-1 cursor-pointer select-none"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Try in Editor</span>
              </button>
            </div>
            <div className="p-3 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-200 leading-relaxed whitespace-pre">
                {codeText}
              </pre>
            </div>
          </div>
        );
      }

      return (
        <code
          className="font-mono text-[11px] sm:text-xs bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded border border-slate-700/70"
          {...props}
        >
          {children}
        </code>
      );
    },
    table: ({ children }: any) => (
      <div className="my-3 overflow-x-auto rounded-xl border border-slate-800 shadow-inner">
        <table className="min-w-full divide-y divide-slate-800 text-xs text-left text-slate-300">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-slate-900 text-amber-300 font-bold tracking-wider text-[11px]">
        {children}
      </thead>
    ),
    tbody: ({ children }: any) => (
      <tbody className="divide-y divide-slate-800/70 bg-slate-950/60">
        {children}
      </tbody>
    ),
    tr: ({ children }: any) => (
      <tr className="hover:bg-slate-900/40 transition-colors">{children}</tr>
    ),
    th: ({ children }: any) => (
      <th className="px-3 py-2 border-b border-slate-800 whitespace-nowrap">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-3 py-2 border-slate-800/50">{children}</td>
    ),
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-3 sm:p-6 md:p-8 space-y-6 w-full max-w-4xl mx-auto scroll-smooth"
    >
      {/* Chapter Top Navigation & Header */}
      <div className="bg-slate-900/95 border border-slate-800/90 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Subtle decorative accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar: Prev/Next Quick Navigation */}
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/80 select-none">
          {prevChapter ? (
            <button
              onClick={() => onSelectChapter(prevChapter.id)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 transition cursor-pointer px-2 py-1 rounded-lg hover:bg-slate-800"
              title={`Previous: Chapter ${prevChapter.id}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">পূর্ববর্তী:</span>
              <span className="font-semibold truncate max-w-[120px] sm:max-w-none">
                Ch {prevChapter.id}
              </span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span className="text-slate-500">অধ্যায়</span>
            <span className="text-amber-400 font-bold">{currentChapter.id}</span>
            <span className="text-slate-500">/ {javaChapters.length}</span>
          </div>

          {nextChapter ? (
            <button
              onClick={() => onSelectChapter(nextChapter.id)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 transition cursor-pointer px-2 py-1 rounded-lg hover:bg-slate-800 ml-auto"
              title={`Next: Chapter ${nextChapter.id}`}
            >
              <span className="hidden sm:inline">পরবর্তী:</span>
              <span className="font-semibold truncate max-w-[120px] sm:max-w-none">
                Ch {nextChapter.id}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div />
          )}
        </div>

        {/* Chapter Title & Meta info */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black text-base sm:text-lg flex items-center justify-center shadow-lg shadow-orange-500/20 flex-shrink-0">
              {currentChapter.id < 10 ? `0${currentChapter.id}` : currentChapter.id}
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase">
                Chapter {currentChapter.id}
              </span>
              <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight leading-snug">
                {currentChapter.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center flex-shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentChapter.readingTime || "15 min"}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentChapter.topics.length} Topics</span>
            </div>
          </div>
        </div>

        {/* Chapter Summary / Overview */}
        {currentChapter.summary && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 markdown-body text-xs sm:text-sm text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800/70 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {currentChapter.summary}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Topics Control Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1 select-none">
        <span className="font-semibold text-slate-200 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>অধ্যায়ের বিষয়বস্তু ({currentChapter.topics.length}টি টপিক)</span>
        </span>
        <div className="flex items-center space-x-3 text-[11px]">
          <button
            onClick={expandAllTopics}
            className="text-amber-400 hover:underline cursor-pointer"
          >
            সবগুলো খুলুন
          </button>
          <span>•</span>
          <button
            onClick={collapseAllTopics}
            className="text-slate-400 hover:underline cursor-pointer"
          >
            সংক্ষেপ করুন
          </button>
        </div>
      </div>

      {/* Clean Topics List */}
      <div className="space-y-4">
        {currentChapter.topics.map((topic, index) => {
          const isTopicOpen = !!openTopicIds[topic.id];
          return (
            <div
              key={topic.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isTopicOpen
                  ? "bg-slate-900/90 border-slate-800 shadow-md"
                  : "bg-slate-900/50 border-slate-800/70 hover:border-slate-700"
              }`}
            >
              {/* Topic Header Toggle */}
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 text-left flex items-center justify-between transition cursor-pointer select-none ${
                  isTopicOpen ? "bg-slate-850/80 border-b border-slate-800" : "hover:bg-slate-850/40"
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 pr-2">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition ${
                      isTopicOpen
                        ? "bg-amber-500 text-slate-950 font-black"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-100 truncate">
                      {topic.title}
                    </h3>
                    {topic.summary && !isTopicOpen && (
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {topic.summary}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  {topic.codeExample && (
                    <span className="text-[10px] bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded border border-slate-700 font-mono hidden sm:inline">
                      Java
                    </span>
                  )}
                  {isTopicOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Topic Content */}
              {isTopicOpen && (
                <div className="p-4 sm:p-5 space-y-4 bg-slate-950/40 text-xs sm:text-sm">
                  {/* Explanation text in Markdown */}
                  <div className="markdown-body text-slate-300 leading-relaxed break-words space-y-2">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {topic.explanation}
                    </ReactMarkdown>
                  </div>

                  {/* Code Snippet */}
                  {topic.codeExample && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-amber-500" />
                          <span>জাভা কোড উদাহরণ:</span>
                        </span>
                        <button
                          onClick={() => onLoadCodeToEditor(topic.codeExample, topic.title)}
                          className="flex items-center space-x-1.5 px-3 py-1 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold transition cursor-pointer active:scale-95"
                          title="এই কোডটি সরাসরি এডিটরে লোড ও রান করুন"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Try in Editor</span>
                        </button>
                      </div>
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 overflow-x-auto shadow-inner">
                        <pre className="font-mono text-xs text-slate-200 leading-relaxed whitespace-pre">
                          {topic.codeExample}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Tips & Common Mistakes in 2 columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {topic.tips && topic.tips.length > 0 && (
                      <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-3.5 space-y-1.5">
                        <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400">
                          <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>জরুরী টিপস (Best Practices)</span>
                        </div>
                        <ul className="space-y-1 text-xs text-emerald-200/90 list-disc list-inside leading-relaxed">
                          {topic.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {topic.commonMistakes && topic.commonMistakes.length > 0 && (
                      <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-3.5 space-y-1.5">
                        <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-400">
                          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>সাধারণ ভুলসমূহ (Common Mistakes)</span>
                        </div>
                        <ul className="space-y-1 text-xs text-rose-200/90 list-disc list-inside leading-relaxed">
                          {topic.commonMistakes.map((mistake, i) => (
                            <li key={i}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Chapter Navigation Footer */}
      <div className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/80">
        {prevChapter ? (
          <button
            onClick={() => onSelectChapter(prevChapter.id)}
            className="w-full sm:w-auto flex-1 flex items-center p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-850 transition cursor-pointer text-left group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-amber-400 mr-3 flex-shrink-0 transition-transform group-hover:-translate-x-1" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                পূর্ববর্তী অধ্যায় {prevChapter.id}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white truncate block">
                {prevChapter.title}
              </span>
            </div>
          </button>
        ) : (
          <div className="hidden sm:block flex-1" />
        )}

        {nextChapter ? (
          <button
            onClick={() => onSelectChapter(nextChapter.id)}
            className="w-full sm:w-auto flex-1 flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-850 transition cursor-pointer text-right group"
          >
            <div className="min-w-0 text-left sm:text-right flex-1 mr-3">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                পরবর্তী অধ্যায় {nextChapter.id}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white truncate block">
                {nextChapter.title}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 flex-shrink-0 transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <div className="hidden sm:block flex-1" />
        )}
      </div>
    </div>
  );
};
