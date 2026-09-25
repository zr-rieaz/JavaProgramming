import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-java";
import { Copy, Check, Play, RotateCcw } from "lucide-react";
import { copyTextSafely } from "../utils/safeBrowser";
import {
  JavaSuggestion,
  BASE_JAVA_SUGGESTIONS,
  extractCodeIdentifiers,
} from "../data/javaSuggestions";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onReset?: () => void;
  isExecuting: boolean;
  fileName?: string;
  subtitle?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onReset,
  isExecuting,
  fileName = "Main.java",
  subtitle,
}) => {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const pendingCursorPosRef = useRef<number | null>(null);

  // Touch gesture tracking for scrolling inside suggestions popup
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isTouchScrollingRef = useRef<boolean>(false);

  // Auto-Suggestion State (Acode Editor Style)
  const [suggestions, setSuggestions] = useState<JavaSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activePrefix, setActivePrefix] = useState<string>("");
  const [suggestionCoords, setSuggestionCoords] = useState<{ top: number; left: number; isAbove: boolean }>({
    top: 0,
    left: 0,
    isAbove: false,
  });

  // Synchronize cursor position immediately after programmatic edits (Enter, Tab, Suggestions)
  useLayoutEffect(() => {
    if (pendingCursorPosRef.current !== null && textareaRef.current) {
      const targetPos = pendingCursorPosRef.current;
      textareaRef.current.setSelectionRange(targetPos, targetPos);
      pendingCursorPosRef.current = null;
    }
  }, [code]);

  // Synchronize scroll between textarea, syntax highlight layer, and update suggestion box
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
    // Reposition or hide suggestion popup on large scroll
    if (showSuggestions && textareaRef.current) {
      const cursor = textareaRef.current.selectionStart;
      computeSuggestionPosition(code, cursor, activePrefix);
    }
  };

  // Close suggestions if user clicks outside
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (editorContainerRef.current && !editorContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  // Compute pixel position for floating suggestion box
  const computeSuggestionPosition = (text: string, cursorPos: number, prefix: string) => {
    const textBefore = text.substring(0, cursorPos);
    const lines = textBefore.split("\n");
    const lineIndex = lines.length - 1;
    const currentLine = lines[lineIndex] || "";
    const colIndex = currentLine.length;
    const textarea = textareaRef.current;
    const container = editorContainerRef.current;
    if (!textarea || !container) return;

    const scrollTop = textarea.scrollTop;
    const scrollLeft = textarea.scrollLeft;
    const lineHeight = 24; // 1.5rem / leading-6 = 24px
    const charWidth = 7.22; // monospace character width

    // Top: 12px padding + (lineIndex + 1) * lineHeight - scrollTop
    const lineBottom = 12 + (lineIndex + 1) * lineHeight - scrollTop;
    // Left: 40px line numbers gutter + 12px padding + (colIndex - prefix.length) * charWidth - scrollLeft
    const tokenStartCol = Math.max(0, colIndex - prefix.length);
    const rawLeft = 40 + 12 + tokenStartCol * charWidth - scrollLeft;

    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width || 360;
    const containerHeight = containerRect.height || 400;

    // Check if popup should flip above the line if near bottom
    const popupEstimatedHeight = 180;
    const isAbove = lineBottom + popupEstimatedHeight > containerHeight && lineBottom > popupEstimatedHeight + 40;
    const top = isAbove ? Math.max(8, lineBottom - lineHeight - popupEstimatedHeight - 4) : Math.max(8, lineBottom + 2);
    const popupWidth = Math.min(300, containerWidth - 24);
    const left = Math.max(8, Math.min(rawLeft, containerWidth - popupWidth - 12));

    setSuggestionCoords({ top, left, isAbove });
  };

  // Update auto-suggestion matches based on current cursor token
  const updateSuggestions = (currentCode: string, cursorPos: number) => {
    if (cursorPos <= 0) {
      setShowSuggestions(false);
      return;
    }

    const textBefore = currentCode.substring(0, cursorPos);
    // Find identifier or dotted access sequence being typed, e.g. "s", "Sy", "System.out.p", "Scanner"
    const match = textBefore.match(/([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*\.?)$/);
    if (!match) {
      setShowSuggestions(false);
      return;
    }

    const prefix = match[1];
    if (!prefix || prefix.length < 1) {
      setShowSuggestions(false);
      return;
    }

    const lowerPrefix = prefix.toLowerCase();
    const dynamicWords = extractCodeIdentifiers(currentCode, cursorPos, prefix);
    const pool = [...BASE_JAVA_SUGGESTIONS, ...dynamicWords];

    // Filter matching suggestions
    const matched = pool.filter((item) => {
      const labelLower = item.label.toLowerCase();
      const insertLower = item.insertText.toLowerCase();

      // Direct prefix match on label or insertion
      if (labelLower.startsWith(lowerPrefix) || insertLower.startsWith(lowerPrefix)) {
        return true;
      }
      // Handle dotted queries like "out.p" or "System.out." or "scanner." or "sc."
      if (lowerPrefix.includes(".")) {
        return labelLower.includes(lowerPrefix) || insertLower.includes(lowerPrefix);
      }
      // If user typed at least 2 chars, also match after dot (e.g. "nextInt" matches "scanner.nextInt()")
      if (lowerPrefix.length >= 2 && labelLower.includes("." + lowerPrefix)) {
        return true;
      }
      return false;
    });

    // Rank suggestions:
    // 1. "sc" shortcuts for Scanner
    // 2. Standard Java keywords / classes / snippets over "from code"
    // 3. Exact prefix match
    // 4. Priority score
    matched.sort((a, b) => {
      const aLabel = a.label.toLowerCase();
      const bLabel = b.label.toLowerCase();
      const aInsert = a.insertText.toLowerCase();
      const bInsert = b.insertText.toLowerCase();

      // When user types Capital 'Sc' or 'Scan' or 'Scanner'
      // The user explicitly wants Scanner declarations first:
      // 1. Scanner sc = new Scanner(System.in);
      // 2. Scanner
      if (prefix.startsWith("Sc") || prefix.startsWith("Scan") || prefix.startsWith("Scanner")) {
        const cleanA = aLabel.replace(/;$/, "");
        const cleanB = bLabel.replace(/;$/, "");
        const capitalScOrder = [
          "scanner sc = new scanner(system.in)",
          "scanner",
          "sc.nextint()",
          "sc.nextline()",
          "sc.nextdouble()",
          "sc",
        ];
        const aIdx = capitalScOrder.indexOf(cleanA);
        const bIdx = capitalScOrder.indexOf(cleanB);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
      }

      // User explicit requirement for small 'sc' shortcuts:
      // 1. sc.nextInt();
      // 2. sc.nextLine();
      // 3. sc.nextDouble();
      // 4. sc
      if (
        prefix === "sc" ||
        prefix === "sca" ||
        prefix === "scan" ||
        lowerPrefix === "sc" ||
        lowerPrefix === "sca"
      ) {
        const cleanA = aLabel.replace(/;$/, "");
        const cleanB = bLabel.replace(/;$/, "");
        const scOrder = [
          "sc.nextint()",
          "sc.nextline()",
          "sc.nextdouble()",
          "sc",
          "scanner sc = new scanner(system.in)",
          "scanner",
        ];
        const aIdx = scOrder.indexOf(cleanA);
        const bIdx = scOrder.indexOf(cleanB);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
      }

      // User explicit requirement for 'sy' / 'Sy' / 'sys' / 'System' shortcuts:
      // When typing "sy", "sys", "system", "Sy", "Sys", "System", "System.", etc.
      // Order:
      // 1. System
      // 2. System.in
      // 3. System.out
      // 4. System.out.println();
      // 5. System.out.print();
      // 6. System.out.printf();
      // 7. System.err
      // 8. System.err.println();
      // 9. System.exit(0);
      // 10. System.currentTimeMillis();
      // 11. System.nanoTime();
      // 12. System.lineSeparator();
      // 13. System.arraycopy();
      // 14. System.gc();
      if (
        lowerPrefix.startsWith("sy") ||
        prefix.startsWith("Sy") ||
        lowerPrefix.startsWith("system")
      ) {
        const cleanA = aLabel.replace(/;$/, "");
        const cleanB = bLabel.replace(/;$/, "");
        const systemOrder = [
          "system",
          "system.in",
          "system.out",
          "system.out.println()",
          "system.out.print()",
          "system.out.printf()",
          "system.err",
          "system.err.println()",
          "system.exit(0)",
          "system.currenttimemillis()",
          "system.nanotime()",
          "system.lineseparator()",
          "system.arraycopy()",
          "system.gc()",
          "system.getenv()",
          "system.getproperty()",
        ];
        const aIdx = systemOrder.indexOf(cleanA);
        const bIdx = systemOrder.indexOf(cleanB);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
      }

      // Crucial: Standard Java keywords, snippets, and classes have priority over "from code"
      const aIsFromCode = a.detail === "from code";
      const bIsFromCode = b.detail === "from code";
      if (!aIsFromCode && bIsFromCode) return -1;
      if (aIsFromCode && !bIsFromCode) return 1;

      const aPrefixMatch = aLabel.startsWith(lowerPrefix) || aInsert.startsWith(lowerPrefix);
      const bPrefixMatch = bLabel.startsWith(lowerPrefix) || bInsert.startsWith(lowerPrefix);

      if (aPrefixMatch && !bPrefixMatch) return -1;
      if (!aPrefixMatch && bPrefixMatch) return 1;

      // Exact case prefix match preference
      const aExactCase = a.label.startsWith(prefix) || a.insertText.startsWith(prefix);
      const bExactCase = b.label.startsWith(prefix) || b.insertText.startsWith(prefix);
      if (aExactCase && !bExactCase) return -1;
      if (!aExactCase && bExactCase) return 1;

      const aPri = a.priority ?? 50;
      const bPri = b.priority ?? 50;
      if (aPri !== bPri) return bPri - aPri;
      return a.label.localeCompare(b.label);
    });

    // Deduplicate by insertText
    const seen = new Set<string>();
    const uniqueMatches: JavaSuggestion[] = [];
    for (const item of matched) {
      if (!seen.has(item.insertText)) {
        seen.add(item.insertText);
        uniqueMatches.push(item);
      }
    }

    const topMatches = uniqueMatches.slice(0, 18);
    if (topMatches.length === 0) {
      setShowSuggestions(false);
      return;
    }

    setSuggestions(topMatches);
    setSelectedIndex(0);
    setActivePrefix(prefix);
    computeSuggestionPosition(currentCode, cursorPos, prefix);
    setShowSuggestions(true);
  };

  // Accept and insert a suggestion (replaces typed prefix, positions cursor inside () or after text)
  const acceptSuggestion = (item: JavaSuggestion) => {
    const target = textareaRef.current;
    if (!target) return;

    const currentCursor = target.selectionStart;
    const prefixLength = activePrefix.length;
    const replaceStart = Math.max(0, currentCursor - prefixLength);
    const replaceEnd = currentCursor;
    const textToInsert = item.insertText;

    const newCode = code.substring(0, replaceStart) + textToInsert + code.substring(replaceEnd);
    let newCursorPos: number;

    if (item.cursorOffset !== undefined) {
      newCursorPos = replaceStart + item.cursorOffset;
    } else if (textToInsert.endsWith("()")) {
      newCursorPos = replaceStart + textToInsert.length - 1; // inside ()
    } else {
      newCursorPos = replaceStart + textToInsert.length;
    }

    setShowSuggestions(false);
    setActivePrefix("");
    pendingCursorPosRef.current = newCursorPos;

    // Reset touch refs
    touchStartRef.current = null;
    isTouchScrollingRef.current = false;

    target.value = newCode;
    target.setSelectionRange(newCursorPos, newCursorPos);
    onChange(newCode);

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    });
  };

  // Auto-close pairs dictionary
  const pairs: Record<string, string> = {
    "(": ")",
    "[": "]",
    "{": "}",
    '"': '"',
    "'": "'",
  };

  // Handle mobile and standard input changes (Ensures auto-closing works on Android Gboard/touch keyboards)
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const newVal = target.value;
    const oldVal = code;
    const cursor = target.selectionStart;

    // Check if exactly 1 character was typed
    if (newVal.length === oldVal.length + 1 && cursor > 0) {
      const insertedChar = newVal[cursor - 1];

      // Auto-closing on Android / touch keyboards
      if (pairs[insertedChar]) {
        const closingChar = pairs[insertedChar];
        const nextChar = newVal[cursor];

        // Only insert closing pair if it is not already immediately followed by it
        if (nextChar !== closingChar) {
          const withPair = newVal.substring(0, cursor) + closingChar + newVal.substring(cursor);
          target.value = withPair;
          target.setSelectionRange(cursor, cursor);
          pendingCursorPosRef.current = cursor;
          onChange(withPair);
          updateSuggestions(withPair, cursor);
          return;
        }
      }

      // Step-over duplicate closing character on Android
      const closingChars = [")", "]", "}", '"', "'"];
      if (closingChars.includes(insertedChar)) {
        if (newVal[cursor] === insertedChar) {
          const deduplicated = newVal.substring(0, cursor) + newVal.substring(cursor + 1);
          target.value = deduplicated;
          target.setSelectionRange(cursor, cursor);
          pendingCursorPosRef.current = cursor;
          onChange(deduplicated);
          updateSuggestions(deduplicated, cursor);
          return;
        }
      }
    }

    onChange(newVal);
    updateSuggestions(newVal, cursor);
  };

  // Keyboard navigation for suggestions, auto-closing on desktop, and indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const start = target.selectionStart;
    const end = target.selectionEnd;

    // 1. Suggestion Box Keyboard Controls
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        acceptSuggestion(suggestions[selectedIndex]);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setShowSuggestions(false);
        return;
      }
    }

    // 2. Desktop Auto-close pairs: (, [, {, ", '
    if (pairs[e.key] && start === end) {
      e.preventDefault();
      const closeChar = pairs[e.key];
      const newCode = code.substring(0, start) + e.key + closeChar + code.substring(end);
      pendingCursorPosRef.current = start + 1;
      target.value = newCode;
      target.setSelectionRange(start + 1, start + 1);
      onChange(newCode);
      updateSuggestions(newCode, start + 1);
      return;
    }

    // 3. Step over closing character if already present at cursor
    const closingChars = [")", "]", "}", '"', "'"];
    if (closingChars.includes(e.key) && start === end && code[start] === e.key) {
      e.preventDefault();
      pendingCursorPosRef.current = start + 1;
      target.setSelectionRange(start + 1, start + 1);
      setShowSuggestions(false);
      return;
    }

    // 4. Backspace: Smart un-indent & empty pair deletion
    if (e.key === "Backspace" && start === end && start > 0) {
      // Check if line before cursor is only spaces (indentation)
      const lineStart = code.lastIndexOf("\n", start - 1) + 1;
      const textBeforeCursorOnLine = code.substring(lineStart, start);

      // Smart un-indent if cursor is on leading spaces (e.g., 8 -> 4, 4 -> 0)
      if (textBeforeCursorOnLine.length >= 1 && /^ +$/.test(textBeforeCursorOnLine)) {
        e.preventDefault();
        const numSpaces = textBeforeCursorOnLine.length;
        const remainder = numSpaces % 4;
        const spacesToDelete = remainder === 0 ? 4 : remainder;
        const newPos = Math.max(lineStart, start - spacesToDelete);
        const newCode = code.substring(0, newPos) + code.substring(start);

        target.value = newCode;
        target.setSelectionRange(newPos, newPos);
        pendingCursorPosRef.current = newPos;
        onChange(newCode);
        updateSuggestions(newCode, newPos);
        return;
      }

      // Empty pair deletion: e.g. (|), [|], {|}, "", ''
      const prevChar = code[start - 1];
      const nextChar = code[start];
      const matchingPairs = ["()", "[]", "{}", '""', "''"];
      if (matchingPairs.includes(prevChar + nextChar)) {
        e.preventDefault();
        const newCode = code.substring(0, start - 1) + code.substring(start + 1);
        pendingCursorPosRef.current = start - 1;
        target.value = newCode;
        target.setSelectionRange(start - 1, start - 1);
        onChange(newCode);
        updateSuggestions(newCode, start - 1);
        return;
      }
    }

    // 5. Smart dedent on typing closing brace '}' on an indented line
    if (e.key === "}" && start === end) {
      const lineStart = code.lastIndexOf("\n", start - 1) + 1;
      const textBefore = code.substring(lineStart, start);
      if (textBefore.length >= 4 && /^ +$/.test(textBefore)) {
        e.preventDefault();
        const newStart = start - 4;
        const newCode = code.substring(0, newStart) + "}" + code.substring(end);
        target.value = newCode;
        target.setSelectionRange(newStart + 1, newStart + 1);
        pendingCursorPosRef.current = newStart + 1;
        onChange(newCode);
        updateSuggestions(newCode, newStart + 1);
        return;
      }
    }

    // 6. Tab key -> 4 spaces or Shift+Tab un-indent
    if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab: Unindent current line by up to 4 spaces
        const lineStart = code.lastIndexOf("\n", start - 1) + 1;
        const textBefore = code.substring(lineStart, start);
        if (/^ +$/.test(textBefore) && textBefore.length > 0) {
          const spacesToRemove = Math.min(4, textBefore.length);
          const newPos = start - spacesToRemove;
          const newCode = code.substring(0, lineStart) + textBefore.substring(spacesToRemove) + code.substring(start);
          target.value = newCode;
          target.setSelectionRange(newPos, newPos);
          pendingCursorPosRef.current = newPos;
          onChange(newCode);
          return;
        }
      } else {
        const newCode = code.substring(0, start) + "    " + code.substring(end);
        pendingCursorPosRef.current = start + 4;
        target.value = newCode;
        target.setSelectionRange(start + 4, start + 4);
        onChange(newCode);
        setShowSuggestions(false);
        return;
      }
    }

    // 7. Enter key -> Intelligent auto-indentation
    if (e.key === "Enter") {
      e.preventDefault();
      const lineStart = code.lastIndexOf("\n", start - 1) + 1;
      const currentLine = code.substring(lineStart, start);
      const indentMatch = currentLine.match(/^\s*/);
      const rawIndent = indentMatch ? indentMatch[0] : "";
      // Standardize tabs into 4 spaces
      const currentIndent = rawIndent.replace(/\t/g, "    ");
      const prevChar = code[start - 1];
      const nextChar = code[start];

      // Case A: Enter between { and } e.g. {|}
      if (prevChar === "{" && nextChar === "}") {
        const extraIndent = "    ";
        const insertion = "\n" + currentIndent + extraIndent + "\n" + currentIndent;
        const newCode = code.substring(0, start) + insertion + code.substring(end);
        const newCursorPos = start + 1 + currentIndent.length + extraIndent.length;
        pendingCursorPosRef.current = newCursorPos;
        target.value = newCode;
        target.setSelectionRange(newCursorPos, newCursorPos);
        onChange(newCode);
        setShowSuggestions(false);
        return;
      }

      // Case B: Enter after { (open block)
      if (currentLine.trim().endsWith("{")) {
        const extraIndent = "    ";
        const insertion = "\n" + currentIndent + extraIndent;
        const newCode = code.substring(0, start) + insertion + code.substring(end);
        const newCursorPos = start + insertion.length;
        pendingCursorPosRef.current = newCursorPos;
        target.value = newCode;
        target.setSelectionRange(newCursorPos, newCursorPos);
        onChange(newCode);
        setShowSuggestions(false);
        return;
      }

      // Case C: Standard Enter with preserved indentation
      const insertion = "\n" + currentIndent;
      const newCode = code.substring(0, start) + insertion + code.substring(end);
      const newCursorPos = start + insertion.length;
      pendingCursorPosRef.current = newCursorPos;
      target.value = newCode;
      target.setSelectionRange(newCursorPos, newCursorPos);
      onChange(newCode);
      setShowSuggestions(false);
      return;
    }

    // 8. Ctrl+Enter or Cmd+Enter -> Run Code
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onRun();
    }
  };

  const handleCopy = async () => {
    const success = await copyTextSafely(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lineCount = code.split("\n").length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  const highlightedCode = Prism.highlight(
    code,
    Prism.languages.java || Prism.languages.clike,
    "java"
  );

  return (
    <div
      ref={editorContainerRef}
      className="flex flex-col h-full w-full bg-slate-950 border-slate-800 overflow-hidden relative"
    >
      {/* Editor Header Bar (Completely untouched - no buttons added or changed) */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 select-none flex-shrink-0">
        <div className="flex items-center space-x-2 min-w-0">
          <span className="text-xs font-semibold text-slate-200 truncate">{fileName}</span>
          {subtitle && (
            <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/50 truncate max-w-[130px] sm:max-w-xs">
              {subtitle}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1.5 flex-shrink-0">
          {onReset && (
            <button
              onClick={onReset}
              className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded transition cursor-pointer"
              title="Reset Code"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 px-2 py-1 rounded transition border border-slate-700/50 cursor-pointer"
            title="Copy Code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 hidden sm:inline">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
          <button
            onClick={() => onRun()}
            disabled={isExecuting}
            className={`flex items-center space-x-1 px-3 py-1 rounded text-xs font-semibold shadow transition cursor-pointer ${
              isExecuting
                ? "bg-amber-600 text-amber-100 opacity-90 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95"
            }`}
            title="Run Code (Ctrl+Enter)"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isExecuting ? "Running..." : "Run"}</span>
          </button>
        </div>
      </div>

      {/* Editor Main Surface */}
      <div className="relative flex-1 flex overflow-hidden font-mono text-xs w-full">
        {/* Line Numbers */}
        <div className="w-10 bg-slate-900/60 py-3 select-none text-right pr-2.5 text-slate-600 font-mono text-[11px] border-r border-slate-800/80 overflow-hidden flex-shrink-0">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code Content Area */}
        <div className="relative flex-1 h-full w-full overflow-hidden">
          {/* Syntax Highlight Layer */}
          <pre
            ref={preRef}
            aria-hidden="true"
            className="absolute inset-0 m-0 p-3 pointer-events-none overflow-hidden whitespace-pre font-mono text-xs leading-6 text-slate-200 select-none"
            dangerouslySetInnerHTML={{ __html: highlightedCode + "\n" }}
          />

          {/* Editable Textarea */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleTextareaChange}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            onClick={() => {
              if (textareaRef.current) {
                updateSuggestions(code, textareaRef.current.selectionStart);
              }
            }}
            spellCheck={false}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            className="absolute inset-0 m-0 p-3 bg-transparent text-transparent caret-amber-400 font-mono text-xs leading-6 resize-none focus:outline-none overflow-auto whitespace-pre z-10 w-full"
          />

          {/* Acode-Style Auto-Suggestion Popup Box (Visible ONLY while typing, zero external buttons) */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              className="absolute z-30 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg shadow-2xl overflow-hidden font-mono text-xs select-none w-64 sm:w-72 max-w-[calc(100vw-36px)]"
              style={{
                top: `${suggestionCoords.top}px`,
                left: `${suggestionCoords.left}px`,
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                className="max-h-48 overflow-y-auto divide-y divide-slate-800/60 py-1 overscroll-contain touch-pan-y"
                style={{ WebkitOverflowScrolling: "touch" }}
                onScroll={(e) => {
                  e.stopPropagation();
                }}
              >
                {suggestions.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.label + index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        acceptSuggestion(item);
                      }}
                      onTouchStart={(e) => {
                        const touch = e.touches[0];
                        touchStartRef.current = {
                          x: touch.clientX,
                          y: touch.clientY,
                          time: Date.now(),
                        };
                        isTouchScrollingRef.current = false;
                      }}
                      onTouchMove={(e) => {
                        if (!touchStartRef.current) return;
                        const touch = e.touches[0];
                        const diffX = Math.abs(touch.clientX - touchStartRef.current.x);
                        const diffY = Math.abs(touch.clientY - touchStartRef.current.y);
                        // Finger movement > 6px indicates vertical scroll, not a tap
                        if (diffX > 6 || diffY > 6) {
                          isTouchScrollingRef.current = true;
                        }
                      }}
                      onTouchEnd={(e) => {
                        // Accept suggestion only on clean tap, NOT when scrolling the list
                        if (!isTouchScrollingRef.current && touchStartRef.current) {
                          e.preventDefault();
                          e.stopPropagation();
                          acceptSuggestion(item);
                        }
                        touchStartRef.current = null;
                        isTouchScrollingRef.current = false;
                      }}
                      onTouchCancel={() => {
                        touchStartRef.current = null;
                        isTouchScrollingRef.current = false;
                      }}
                      className={`px-2.5 py-1.5 flex items-center justify-between cursor-pointer transition select-none ${
                        isSelected
                          ? "bg-amber-600/90 text-white font-semibold"
                          : "text-slate-200 hover:bg-slate-800/80 active:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        {/* Kind Badge */}
                        <span
                          className={`text-[9px] uppercase px-1 py-0.2 rounded font-bold tracking-wider flex-shrink-0 ${
                            item.kind === "snippet"
                              ? isSelected
                                ? "bg-white/20 text-white"
                                : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                              : item.kind === "class"
                              ? isSelected
                                ? "bg-white/20 text-white"
                                : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                              : item.kind === "field"
                              ? isSelected
                                ? "bg-white/20 text-white"
                                : "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                              : item.kind === "method"
                              ? isSelected
                                ? "bg-white/20 text-white"
                                : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                              : item.kind === "keyword"
                              ? isSelected
                                ? "bg-white/20 text-white"
                                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : item.detail === "from code"
                              ? isSelected
                                ? "bg-white/20 text-white"
                                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : isSelected
                              ? "bg-white/20 text-white"
                              : "bg-slate-700/40 text-slate-400"
                          }`}
                        >
                          {item.kind === "snippet"
                            ? "snip"
                            : item.kind === "class"
                            ? "class"
                            : item.kind === "field"
                            ? "field"
                            : item.kind === "method"
                            ? "func"
                            : item.kind === "keyword"
                            ? "key"
                            : item.detail === "from code"
                            ? "code"
                            : "var"}
                        </span>
                        {/* Label with highlighted prefix */}
                        <span className="truncate text-xs">
                          {item.label}
                        </span>
                      </div>
                      {/* Detail hint */}
                      {item.detail && (
                        <span
                          className={`text-[10px] ml-2 truncate max-w-[90px] ${
                            isSelected ? "text-amber-100/80" : "text-slate-500"
                          }`}
                        >
                          {item.detail}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Bottom hint bar (Enter or Tap to insert) */}
              <div className="bg-slate-950/80 px-2 py-1 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-800/80">
                <span className="truncate">Enter/Tap to complete</span>
                <span className="text-slate-500">Acode Suggest</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
