import React, { useState, useEffect, useRef } from "react";
import { CornerDownLeft, X, Terminal, HelpCircle } from "lucide-react";

interface ProgramInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: string) => void;
  onRunWithoutInput: () => void;
  initialValue?: string;
}

export const ProgramInputModal: React.FC<ProgramInputModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onRunWithoutInput,
  initialValue = "",
}) => {
  const [inputVal, setInputVal] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setInputVal(initialValue || "");
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSubmit(inputVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-850 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <Terminal className="w-4 h-4" />
            <span>প্রোগ্রামের জন্য ইনপুট প্রয়োজন (Input Required)</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="leading-relaxed">
              আপনার জাভা কোডে <code className="bg-slate-800 text-amber-300 px-1 py-0.5 rounded font-mono">Scanner</code> অথবা <code className="bg-slate-800 text-amber-300 px-1 py-0.5 rounded font-mono">System.in</code> দিয়ে ইনপুট চাওয়া হয়েছে।
            </p>
            <p className="text-slate-400 text-[11px] flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400/80 flex-shrink-0" />
              <span>একাধিক ইনপুট দিতে প্রতিটি মান আলাদা লাইনে (Enter দিয়ে) লিখুন।</span>
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="text-slate-500 text-[10px]">দ্রুত উদাহরণ:</span>
            <button
              type="button"
              onClick={() => setInputVal("101")}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 transition cursor-pointer font-mono"
            >
              101
            </button>
            <button
              type="button"
              onClick={() => setInputVal("101\nRahim\n3.88")}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 transition cursor-pointer font-mono"
            >
              101 + রহিম + 3.88
            </button>
            <button
              type="button"
              onClick={() => setInputVal("25\n50")}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 transition cursor-pointer font-mono"
            >
              25, 50
            </button>
          </div>

          {/* Input Textarea */}
          <div className="space-y-1">
            <textarea
              ref={textareaRef}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={4}
              placeholder="এখানে ইনপুটের মান লিখুন...&#10;উদাহরণ:&#10;101"
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-slate-100 font-mono text-xs rounded-xl p-3 resize-none outline-none leading-relaxed shadow-inner placeholder:text-slate-600"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
              <span>Ctrl + Enter চেপে সরাসরি রান করতে পারেন</span>
              <span>{inputVal.length} অক্ষর</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onRunWithoutInput}
              className="text-xs text-slate-400 hover:text-slate-200 hover:underline cursor-pointer"
            >
              ইনপুট ছাড়া সরাসরি রান করুন
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium transition cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="flex items-center space-x-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <span>রান করুন (Run)</span>
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
