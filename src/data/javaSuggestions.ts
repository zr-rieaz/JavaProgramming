export interface JavaSuggestion {
  label: string;
  insertText: string;
  cursorOffset?: number; // Cursor position relative to start of insertText
  kind: "snippet" | "class" | "keyword" | "method" | "word" | "field";
  detail?: string;
  priority?: number;
}

export const BASE_JAVA_SUGGESTIONS: JavaSuggestion[] = [
  // Top Requested Scanner Suggestions (sc shorthand with semicolons)
  {
    label: "sc.nextInt();",
    insertText: "sc.nextInt();",
    cursorOffset: 13,
    kind: "method",
    detail: "Read next int",
    priority: 125,
  },
  {
    label: "sc.nextLine();",
    insertText: "sc.nextLine();",
    cursorOffset: 14,
    kind: "method",
    detail: "Read full line String",
    priority: 124,
  },
  {
    label: "sc.nextDouble();",
    insertText: "sc.nextDouble();",
    cursorOffset: 16,
    kind: "method",
    detail: "Read double value",
    priority: 123,
  },
  {
    label: "sc",
    insertText: "sc",
    cursorOffset: 2,
    kind: "word",
    detail: "Scanner sc instance",
    priority: 122,
  },
  {
    label: "sc.next();",
    insertText: "sc.next();",
    cursorOffset: 10,
    kind: "method",
    detail: "Read next token String",
    priority: 121,
  },
  {
    label: "sc.nextBoolean();",
    insertText: "sc.nextBoolean();",
    cursorOffset: 17,
    kind: "method",
    detail: "Read boolean true/false",
    priority: 120,
  },
  {
    label: "sc.nextLong();",
    insertText: "sc.nextLong();",
    cursorOffset: 14,
    kind: "method",
    detail: "Read 64-bit long integer",
    priority: 119,
  },
  {
    label: "sc.hasNext()",
    insertText: "sc.hasNext()",
    cursorOffset: 11,
    kind: "method",
    detail: "Check if token available",
    priority: 118,
  },
  {
    label: "sc.hasNextInt()",
    insertText: "sc.hasNextInt()",
    cursorOffset: 14,
    kind: "method",
    detail: "Check if int available",
    priority: 117,
  },
  {
    label: "sc.hasNextLine()",
    insertText: "sc.hasNextLine()",
    cursorOffset: 15,
    kind: "method",
    detail: "Check if line available",
    priority: 116,
  },
  {
    label: "sc.close();",
    insertText: "sc.close();",
    cursorOffset: 11,
    kind: "method",
    detail: "Close sc stream",
    priority: 115,
  },
  // Full Scanner init and Scanner class
  {
    label: "Scanner sc = new Scanner(System.in);",
    insertText: "Scanner sc = new Scanner(System.in);",
    cursorOffset: 36,
    kind: "snippet",
    detail: "Initialize Scanner sc for stdin",
    priority: 114,
  },
  {
    label: "Scanner",
    insertText: "Scanner",
    cursorOffset: 7,
    kind: "class",
    detail: "java.util.Scanner",
    priority: 113,
  },
  // Common High-Priority System Class, Streams, Snippets & Shortcuts
  {
    label: "System",
    insertText: "System",
    cursorOffset: 6,
    kind: "class",
    detail: "java.lang.System",
    priority: 111,
  },
  {
    label: "System.in",
    insertText: "System.in",
    cursorOffset: 9,
    kind: "field",
    detail: "Standard input stream (InputStream)",
    priority: 110,
  },
  {
    label: "System.out",
    insertText: "System.out",
    cursorOffset: 10,
    kind: "field",
    detail: "Standard output stream (PrintStream)",
    priority: 109,
  },
  {
    label: "System.out.println();",
    insertText: "System.out.println();",
    cursorOffset: 19, // Inside ()
    kind: "snippet",
    detail: "Prints line to console",
    priority: 108,
  },
  {
    label: "System.out.print();",
    insertText: "System.out.print();",
    cursorOffset: 17, // Inside ()
    kind: "snippet",
    detail: "Prints to console without newline",
    priority: 107,
  },
  {
    label: "System.out.printf();",
    insertText: 'System.out.printf("");',
    cursorOffset: 19, // Inside ""
    kind: "snippet",
    detail: "Formatted console output",
    priority: 106,
  },
  {
    label: "System.err",
    insertText: "System.err",
    cursorOffset: 10,
    kind: "field",
    detail: "Standard error stream (PrintStream)",
    priority: 105,
  },
  {
    label: "System.err.println();",
    insertText: "System.err.println();",
    cursorOffset: 19,
    kind: "snippet",
    detail: "Prints line to error stream",
    priority: 104,
  },
  {
    label: "System.exit(0);",
    insertText: "System.exit(0);",
    cursorOffset: 15,
    kind: "snippet",
    detail: "Terminates current JVM process",
    priority: 103,
  },
  {
    label: "System.currentTimeMillis();",
    insertText: "System.currentTimeMillis();",
    cursorOffset: 27,
    kind: "snippet",
    detail: "Current time in milliseconds",
    priority: 102,
  },
  {
    label: "System.nanoTime();",
    insertText: "System.nanoTime();",
    cursorOffset: 17,
    kind: "snippet",
    detail: "High-resolution time source (nanoseconds)",
    priority: 101,
  },
  {
    label: "System.lineSeparator();",
    insertText: "System.lineSeparator();",
    cursorOffset: 23,
    kind: "snippet",
    detail: "System-dependent line separator string",
    priority: 100,
  },
  {
    label: "System.arraycopy();",
    insertText: "System.arraycopy(src, 0, dest, 0, len);",
    cursorOffset: 17,
    kind: "snippet",
    detail: "Fast native copy between arrays",
    priority: 99,
  },
  {
    label: "System.gc();",
    insertText: "System.gc();",
    cursorOffset: 10,
    kind: "snippet",
    detail: "Suggests JVM garbage collection",
    priority: 98,
  },
  {
    label: "System.getenv()",
    insertText: "System.getenv()",
    cursorOffset: 14,
    kind: "method",
    detail: "Read environment variable map",
    priority: 97,
  },
  {
    label: "System.getProperty()",
    insertText: 'System.getProperty("")',
    cursorOffset: 20,
    kind: "method",
    detail: "Read system property",
    priority: 96,
  },
  {
    label: "sout",
    insertText: "System.out.println();",
    cursorOffset: 19,
    kind: "snippet",
    detail: "System.out.println(); shortcut",
    priority: 108,
  },
  {
    label: "syso",
    insertText: "System.out.println();",
    cursorOffset: 19,
    kind: "snippet",
    detail: "System.out.println(); shortcut",
    priority: 108,
  },
  {
    label: "sysout",
    insertText: "System.out.println();",
    cursorOffset: 19,
    kind: "snippet",
    detail: "System.out.println(); shortcut",
    priority: 108,
  },
  {
    label: "Scanner init",
    insertText: "Scanner sc = new Scanner(System.in);",
    cursorOffset: 36,
    kind: "snippet",
    detail: "Initialize Scanner sc for stdin",
    priority: 112,
  },
  {
    label: "public static void main",
    insertText: "public static void main(String[] args) {\n        \n    }",
    cursorOffset: 49,
    kind: "snippet",
    detail: "Main method signature",
    priority: 92,
  },
  {
    label: "public class",
    insertText: "public class Main {\n    \n}",
    cursorOffset: 24,
    kind: "snippet",
    detail: "Class declaration",
    priority: 88,
  },
  // Keywords & Modifiers
  { label: "import", insertText: "import ", kind: "keyword", detail: "Import package", priority: 96 },
  { label: "public", insertText: "public ", kind: "keyword", detail: "Access modifier", priority: 95 },
  { label: "class", insertText: "class ", kind: "keyword", detail: "Class keyword", priority: 95 },
  { label: "static", insertText: "static ", kind: "keyword", detail: "Static modifier", priority: 94 },
  { label: "void", insertText: "void ", kind: "keyword", detail: "No return type", priority: 94 },
  { label: "package", insertText: "package ", kind: "keyword", detail: "Package declaration", priority: 93 },
  { label: "return", insertText: "return ", kind: "keyword", detail: "Return statement", priority: 92 },
  { label: "new", insertText: "new ", kind: "keyword", detail: "Instantiate object", priority: 91 },
  { label: "private", insertText: "private ", kind: "keyword", detail: "Access modifier", priority: 88 },
  { label: "protected", insertText: "protected ", kind: "keyword", detail: "Access modifier", priority: 86 },
  { label: "final", insertText: "final ", kind: "keyword", detail: "Constant modifier", priority: 85 },
  { label: "this", insertText: "this", kind: "keyword", detail: "Current instance", priority: 84 },
  { label: "super", insertText: "super", kind: "keyword", detail: "Superclass reference", priority: 82 },
  { label: "interface", insertText: "interface ", kind: "keyword", detail: "Interface keyword", priority: 80 },
  { label: "extends", insertText: "extends ", kind: "keyword", detail: "Class inheritance", priority: 80 },
  { label: "implements", insertText: "implements ", kind: "keyword", detail: "Interface implementation", priority: 80 },
  // Primitive Types
  { label: "int", insertText: "int ", kind: "keyword", detail: "32-bit integer", priority: 92 },
  { label: "double", insertText: "double ", kind: "keyword", detail: "64-bit floating point", priority: 90 },
  { label: "boolean", insertText: "boolean ", kind: "keyword", detail: "true or false", priority: 90 },
  { label: "char", insertText: "char ", kind: "keyword", detail: "16-bit Unicode character", priority: 88 },
  { label: "float", insertText: "float ", kind: "keyword", detail: "32-bit floating point", priority: 86 },
  { label: "long", insertText: "long ", kind: "keyword", detail: "64-bit integer", priority: 86 },
  { label: "byte", insertText: "byte ", kind: "keyword", detail: "8-bit integer", priority: 80 },
  { label: "short", insertText: "short ", kind: "keyword", detail: "16-bit integer", priority: 80 },
  // Control Flow
  {
    label: "if",
    insertText: "if () {\n        \n    }",
    cursorOffset: 4, // inside ()
    kind: "snippet",
    detail: "If condition",
    priority: 85,
  },
  {
    label: "if-else",
    insertText: "if () {\n        \n    } else {\n        \n    }",
    cursorOffset: 4,
    kind: "snippet",
    detail: "If-Else block",
    priority: 84,
  },
  {
    label: "else",
    insertText: "else {\n        \n    }",
    cursorOffset: 14,
    kind: "snippet",
    detail: "Else block",
    priority: 80,
  },
  {
    label: "for loop",
    insertText: "for (int i = 0; i < ; i++) {\n        \n    }",
    cursorOffset: 20, // before condition limit
    kind: "snippet",
    detail: "Standard for loop",
    priority: 85,
  },
  {
    label: "for-each",
    insertText: "for ( : ) {\n        \n    }",
    cursorOffset: 5,
    kind: "snippet",
    detail: "Enhanced for loop",
    priority: 80,
  },
  {
    label: "while loop",
    insertText: "while () {\n        \n    }",
    cursorOffset: 7, // inside ()
    kind: "snippet",
    detail: "While loop",
    priority: 82,
  },
  {
    label: "do-while",
    insertText: "do {\n        \n    } while ();",
    cursorOffset: 9,
    kind: "snippet",
    detail: "Do-while loop",
    priority: 75,
  },
  {
    label: "switch",
    insertText: "switch () {\n        case 1:\n            \n            break;\n        default:\n            \n    }",
    cursorOffset: 8,
    kind: "snippet",
    detail: "Switch case",
    priority: 78,
  },
  { label: "case", insertText: "case :", cursorOffset: 5, kind: "keyword", detail: "Switch branch", priority: 75 },
  { label: "break", insertText: "break;", kind: "keyword", detail: "Break loop/switch", priority: 78 },
  { label: "continue", insertText: "continue;", kind: "keyword", detail: "Continue loop", priority: 75 },
  { label: "default", insertText: "default:\n        ", cursorOffset: 16, kind: "keyword", detail: "Switch default", priority: 72 },
  // Common Java Utilities & Collections
  { label: "String", insertText: "String ", kind: "class", detail: "java.lang.String", priority: 92 },
  { label: "StringBuilder", insertText: "StringBuilder ", kind: "class", detail: "java.lang.StringBuilder", priority: 79 },
  { label: "StringBuffer", insertText: "StringBuffer ", kind: "class", detail: "java.lang.StringBuffer", priority: 77 },
  { label: "ArrayList", insertText: "ArrayList<>", cursorOffset: 10, kind: "class", detail: "java.util.ArrayList", priority: 80 },
  { label: "List", insertText: "List<>", cursorOffset: 5, kind: "class", detail: "java.util.List", priority: 78 },
  { label: "HashMap", insertText: "HashMap<, >", cursorOffset: 8, kind: "class", detail: "java.util.HashMap", priority: 76 },
  { label: "Map", insertText: "Map<, >", cursorOffset: 4, kind: "class", detail: "java.util.Map", priority: 74 },
  { label: "Arrays", insertText: "Arrays", kind: "class", detail: "java.util.Arrays", priority: 75 },
  { label: "Collections", insertText: "Collections", kind: "class", detail: "java.util.Collections", priority: 72 },
  { label: "Math", insertText: "Math", kind: "class", detail: "java.lang.Math", priority: 78 },
  // Common Methods
  { label: "println();", insertText: "println();", cursorOffset: 9, kind: "method", detail: "Print line with newline", priority: 86 },
  { label: "print();", insertText: "print();", cursorOffset: 7, kind: "method", detail: "Print without newline", priority: 85 },
  { label: "printf();", insertText: 'printf("");', cursorOffset: 8, kind: "method", detail: "Print formatted string", priority: 84 },
  { label: "nextInt()", insertText: "nextInt()", kind: "method", detail: "Read next integer", priority: 85 },
  { label: "nextLine()", insertText: "nextLine()", kind: "method", detail: "Read entire line", priority: 85 },
  { label: "nextDouble()", insertText: "nextDouble()", kind: "method", detail: "Read double value", priority: 82 },
  { label: "next()", insertText: "next()", kind: "method", detail: "Read next token", priority: 80 },
  { label: "hasNext()", insertText: "hasNext()", kind: "method", detail: "Check if token exists", priority: 78 },
  { label: "length()", insertText: "length()", kind: "method", detail: "String length", priority: 82 },
  { label: "length", insertText: "length", kind: "keyword", detail: "Array length property", priority: 82 },
  { label: "charAt()", insertText: "charAt()", cursorOffset: 7, kind: "method", detail: "Character at index", priority: 78 },
  { label: "substring()", insertText: "substring()", cursorOffset: 10, kind: "method", detail: "Substring extraction", priority: 76 },
  { label: "equals()", insertText: "equals()", cursorOffset: 7, kind: "method", detail: "Object equality", priority: 80 },
  { label: "equalsIgnoreCase()", insertText: "equalsIgnoreCase()", cursorOffset: 17, kind: "method", detail: "Case-insensitive equal", priority: 75 },
  { label: "toUpperCase()", insertText: "toUpperCase()", kind: "method", detail: "Convert to uppercase", priority: 75 },
  { label: "toLowerCase()", insertText: "toLowerCase()", kind: "method", detail: "Convert to lowercase", priority: 75 },
  { label: "indexOf()", insertText: "indexOf()", cursorOffset: 8, kind: "method", detail: "Index of char/string", priority: 74 },
  { label: "contains()", insertText: "contains()", cursorOffset: 9, kind: "method", detail: "Check containment", priority: 75 },
  { label: "toString()", insertText: "toString()", kind: "method", detail: "String representation", priority: 78 },
  // Math Methods
  { label: "Math.max", insertText: "Math.max(, )", cursorOffset: 9, kind: "method", detail: "Maximum of two values", priority: 80 },
  { label: "Math.min", insertText: "Math.min(, )", cursorOffset: 9, kind: "method", detail: "Minimum of two values", priority: 80 },
  { label: "Math.sqrt", insertText: "Math.sqrt()", cursorOffset: 10, kind: "method", detail: "Square root", priority: 80 },
  { label: "Math.pow", insertText: "Math.pow(, )", cursorOffset: 9, kind: "method", detail: "Power calculation", priority: 80 },
  { label: "Math.abs", insertText: "Math.abs()", cursorOffset: 9, kind: "method", detail: "Absolute value", priority: 78 },
  { label: "Math.PI", insertText: "Math.PI", kind: "keyword", detail: "Pi constant (3.14159...)", priority: 75 },
  // Parsing
  { label: "Integer.parseInt", insertText: "Integer.parseInt()", cursorOffset: 17, kind: "method", detail: "Parse string to int", priority: 80 },
  { label: "Double.parseDouble", insertText: "Double.parseDouble()", cursorOffset: 19, kind: "method", detail: "Parse string to double", priority: 78 },
  { label: "String.valueOf", insertText: "String.valueOf()", cursorOffset: 15, kind: "method", detail: "Convert to String", priority: 76 },
  // Exception Handling
  {
    label: "try-catch",
    insertText: "try {\n        \n    } catch (Exception e) {\n        e.printStackTrace();\n    }",
    cursorOffset: 14,
    kind: "snippet",
    detail: "Try-catch block",
    priority: 78,
  },
  { label: "catch", insertText: "catch (Exception e) {\n        \n    }", cursorOffset: 30, kind: "snippet", detail: "Catch block", priority: 72 },
  { label: "finally", insertText: "finally {\n        \n    }", cursorOffset: 17, kind: "snippet", detail: "Finally block", priority: 70 },
  { label: "throw", insertText: "throw ", kind: "keyword", detail: "Throw exception", priority: 70 },
  { label: "throws", insertText: "throws ", kind: "keyword", detail: "Declare thrown exception", priority: 70 },
  { label: "Exception", insertText: "Exception", kind: "class", detail: "java.lang.Exception", priority: 72 },
];

const JAVA_RESERVED_WORDS = new Set([
  "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char",
  "class", "const", "continue", "default", "do", "double", "else", "enum",
  "extends", "final", "finally", "float", "for", "goto", "if", "implements",
  "import", "instanceof", "int", "interface", "long", "native", "new", "package",
  "private", "protected", "public", "return", "short", "static", "strictfp",
  "super", "switch", "synchronized", "this", "throw", "throws", "transient",
  "try", "void", "volatile", "while", "true", "false", "null", "var", "record",
  "string", "system", "scanner", "math", "arrays", "collections", "list", "arraylist",
  "map", "hashmap", "set", "hashset", "main", "out", "println", "print", "printf"
]);

/**
 * Extracts identifiers and user-defined variables/methods from the code,
 * strictly excluding the token currently being typed at the cursor position
 * and any Java language keywords.
 */
export function extractCodeIdentifiers(
  code: string,
  cursorPos?: number,
  activePrefix?: string
): JavaSuggestion[] {
  // If a cursor position is provided, remove the word currently being typed
  // so the unfinished word the user is typing is NEVER suggested back as "from code"!
  let codeToScan = code;
  if (cursorPos !== undefined && cursorPos > 0) {
    const textBefore = code.substring(0, cursorPos);
    const beforeMatch = textBefore.match(/[A-Za-z0-9_]+$/);
    const prefixLen = beforeMatch ? beforeMatch[0].length : (activePrefix ? activePrefix.length : 0);
    const tokenStart = Math.max(0, cursorPos - prefixLen);

    const textAfter = code.substring(cursorPos);
    const afterMatch = textAfter.match(/^[A-Za-z0-9_]+/);
    const suffixLen = afterMatch ? afterMatch[0].length : 0;
    const tokenEnd = cursorPos + suffixLen;

    codeToScan = code.substring(0, tokenStart) + " " + code.substring(tokenEnd);
  }

  // Extract all identifiers from the remaining code (2 or more characters)
  const codeWords = codeToScan.match(/\b[A-Za-z_][A-Za-z0-9_]*\b/g) || [];
  const wordsSet = new Set<string>();
  const prefixLower = (activePrefix || "").toLowerCase();

  for (const w of codeWords) {
    if (w.length >= 2 && !/^\d+$/.test(w)) {
      const lower = w.toLowerCase();
      // Skip Java keywords and standard primitives
      if (JAVA_RESERVED_WORDS.has(lower)) {
        continue;
      }
      // Skip if it exactly matches the partial prefix currently being typed
      if (prefixLower && lower === prefixLower) {
        continue;
      }
      wordsSet.add(w);
    }
  }

  // Exact base labels to avoid redundant duplicates
  const baseExactLabels = new Set(
    BASE_JAVA_SUGGESTIONS.map((s) => s.label.toLowerCase().trim())
  );

  const result: JavaSuggestion[] = [];
  for (const word of wordsSet) {
    if (baseExactLabels.has(word.toLowerCase())) {
      continue;
    }
    result.push({
      label: word,
      insertText: word,
      cursorOffset: word.length,
      kind: "word",
      detail: "from code",
      priority: 45, // Lower than standard Java keywords and snippets (70-120), so keywords always take precedence!
    });
  }

  return result;
}
