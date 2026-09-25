export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type ViewMode = "book" | "programs" | "editor" | "terminal" | "playground";
export type AppView = "book" | "programs" | "lab" | "bookmarks";
export type TerminalTab = "output" | "input" | "logs" | "tips";

export interface JavaProgram {
  id: string;
  title: string;
  bengaliTitle: string;
  chapter: number;
  chapterTitle: string;
  difficulty: DifficultyLevel;
  category: string;
  description: string;
  code: string;
  expectedOutput: string;
  sampleInput?: string;
  explanation: string;
  keyPoints: string[];
  tags: string[];
}

export interface ChapterTopic {
  id: string;
  title: string;
  bengaliTitle: string;
  summary: string;
  explanation: string;
  codeExample: string;
  tips: string[];
  commonMistakes: string[];
}

export interface Chapter {
  id: number;
  title: string;
  bengaliTitle: string;
  iconName: string;
  summary: string;
  readingTime?: string;
  topics: ChapterTopic[];
}

export interface ExecutionResult {
  success: boolean;
  phase: "compile" | "runtime" | "timeout" | "server" | "client-fallback" | "input";
  stdout: string;
  stderr: string;
  error?: string;
  exitCode?: number | null;
  executionTimeMs: number;
  timestamp: number;
  className?: string;
}

export interface EditorSettings {
  fontSize: number;
  autoCloseBrackets: boolean;
  lineNumbers: boolean;
  tabSize: number;
  wordWrap: boolean;
}
