export interface JavaErrorExplanation {
  title: string;
  category: "Syntax Error" | "Compilation Error" | "Runtime Exception" | "Type Error" | "Logical / Execution Error";
  line?: number;
  explanation: string;
  solutionSteps: string[];
  codeTip?: string;
  faultyCodeSnippet?: string;
}

/**
 * Explains Java compiler and runtime errors in clean, beginner-friendly Bengali
 * with actionable recommended solutions and code fix snippets.
 */
export function explainJavaError(errorOutput: string, sourceCode?: string): JavaErrorExplanation {
  if (!errorOutput) {
    return {
      title: "অপ্রত্যাশিত সমস্যা (Unknown Execution Issue)",
      category: "Logical / Execution Error",
      explanation: "প্রোগ্রামটি চলার সময় একটি ত্রুটি ঘটেছে, তবে সুনির্দিষ্ট কোনো বিবরণ পাওয়া যায়নি।",
      solutionSteps: [
        "কোডের প্রতিটি স্টেটমেন্টের শেষে সেমিকোলন (;) আছে কি না পরীক্ষা করুন।",
        "ক্লাস এবং মেইন মেথডের সব বন্ধনী ({ }, [ ], ( )) সঠিকভাবে জোড়া মিলানো আছে কি না যাচাই করুন।",
        "ক্লাসের নাম 'Main' এবং মেইন মেথড 'public static void main(String[] args)' ঠিক আছে কি না দেখুন।",
      ],
      codeTip: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
    };
  }

  const text = errorOutput.toLowerCase();

  // Extract line number if present (Strictly user's code file, NOT JDK internal classes like Scanner.java)
  let detectedLine: number | undefined;
  const mainLineMatch =
    errorOutput.match(/Main\.main\(Main\.java:(\d+)\)/i) ||
    errorOutput.match(/Main\.java:(\d+)/i) ||
    errorOutput.match(/line\s+(\d+)/i);

  if (mainLineMatch && mainLineMatch[1]) {
    const parsed = parseInt(mainLineMatch[1], 10);
    // Ignore out-of-range line numbers (e.g. Scanner.java:945) when user's file is much shorter
    if (!sourceCode || parsed <= sourceCode.split("\n").length) {
      detectedLine = parsed;
    }
  }

  // Extract the snippet line from source code if available
  let faultySnippet: string | undefined;
  if (detectedLine && sourceCode) {
    const lines = sourceCode.split("\n");
    if (lines[detectedLine - 1]) {
      faultySnippet = lines[detectedLine - 1].trim();
    }
  }

  // 0. Scanner missing input / NoSuchElementException
  if (
    text.includes("nosuchelementexception") ||
    (text.includes("scanner") && (text.includes("nosuch") || text.includes("end of file")))
  ) {
    return {
      title: "ইনপুট পাওয়া যায়নি (NoSuchElementException)",
      category: "Runtime Exception",
      line: detectedLine,
      explanation:
        "আপনার প্রোগ্রামে Scanner দিয়ে ইউজারের কাছ থেকে ইনপুট (যেমন: sc.nextInt() বা sc.nextLine()) চাওয়া হয়েছে, কিন্তু ইনপুট হিসেবে কোনো মান প্রদান করা হয়নি। ফলে ইনপুট পড়তে না পেরে প্রোগ্রামটি বন্ধ হয়ে গেছে।",
      solutionSteps: [
        "কোড রান করার পূর্বে ইনপুট দিন (যেমন: '101' বা শিক্ষার্থীর আইডি)।",
        "টার্মিনাল থেকে ইনপুট লিখে Enter চাপুন অথবা ইনপুট প্রম্পটে মান প্রদান করুন।",
        "যদি টেস্ট করতে চান, তবে কোডেই সরাসরি মান নির্ধারণ করে দিতে পারেন (যেমন: int id = 101;)।",
      ],
      codeTip:
        "// সমাধান ১: কোডে সরাসরি মান দিয়ে রান করা:\nint id = 101;\nSystem.out.println(\"আইডি: \" + id);\n\n// সমাধান ২: Scanner ব্যবহার করলে রান করার সময় ইনপুট দিন:\nScanner sc = new Scanner(System.in);\nint id = sc.nextInt();",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 0.1. InputMismatchException (যেমন সংখ্যা চাওয়ার জায়গায় অক্ষর লিখলে)
  if (text.includes("inputmismatchexception")) {
    return {
      title: "ভুল ধরনের ইনপুট দেওয়া হয়েছে (InputMismatchException)",
      category: "Runtime Exception",
      line: detectedLine,
      explanation:
        "Scanner দিয়ে যে ধরনের ডেটা চাওয়া হয়েছিল, তার পরিবর্তে ভিন্ন ধরনের ইনপুট দেওয়া হয়েছে। উদাহরণস্বরূপ: sc.nextInt() পূর্ণসংখ্যার জায়গায় কোনো অক্ষর বা টেক্সট লিখলে এই ত্রুটি ঘটে।",
      solutionSteps: [
        "sc.nextInt() ব্যবহার করলে শুধুমাত্র পূর্ণসংখ্যা (যেমন: 25, 101) লিখুন।",
        "sc.nextDouble() ব্যবহার করলে দশমিক সংখ্যা (যেমন: 3.88) দিন।",
        "টেক্সট বা নাম ইনপুট নিতে sc.next() অথবা sc.nextLine() ব্যবহার করুন।",
      ],
      codeTip:
        "Scanner sc = new Scanner(System.in);\nint number = sc.nextInt(); // এখানে শুধু সংখ্যা ইনপুট দিবেন",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 1. Semicolon expected (সেমিকোলন মিসিং)
  if (text.includes("';' expected") || text.includes("semicolon expected")) {
    return {
      title: "সেমিকোলন (;) দিতে ভুলে গেছেন",
      category: "Syntax Error",
      line: detectedLine,
      explanation:
        "জাভাতে প্রতিটি সাধারণ নির্দেশ বা স্টেটমেন্টের (যেমন ভেরিয়েবল তৈরি, মান অ্যাসাইন করা, বা System.out.println) শেষে একটি সেমিকোলন (;) দেওয়া বাধ্যতামূলক। আপনি যে লাইনটিতে কোড লিখেছেন তার শেষে সেমিকোলন দেননি।",
      solutionSteps: [
        detectedLine
          ? `কোডের লাইন নম্বর ${detectedLine}-এর শেষে গিয়ে একটি সেমিকোলন ';' যোগ করুন।`
          : "যে লাইনে এরর দেখাচ্ছে তার শেষে গিয়ে একটি সেমিকোলন ';' যোগ করুন।",
        "মনে রাখবেন: ভেরিয়েবল ডিক্লারেশন, মেথড কল ও রিটার্ন স্টেটমেন্টের শেষে ';' আবশ্যক।",
        "তবে class, if, else, for, while এবং মেথড ব্লকের { }-এর শেষে সেমিকোলন লাগে না।",
      ],
      codeTip: "int number = 42; // লাইনের শেষে অবশ্যই সেমিকোলন থাকতে হবে\nSystem.out.println(number);",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 2. Unclosed string literal (স্ট্রিং কোটেশন ক্লোজ করা হয়নি)
  if (text.includes("unclosed string literal")) {
    return {
      title: "স্ট্রিং-এর ডাবল কোটেশন (\") অসম্পূর্ণ রয়েছে",
      category: "Syntax Error",
      line: detectedLine,
      explanation:
        "জাভাতে কোনো লেখা বা টেক্সট (String) লেখার সময় শুরুর মতো শেষেও ডাবল কোটেশন (\") দিয়ে তা বন্ধ করতে হয়। আপনি কোটেশন শুরু করেছিলেন কিন্তু একই লাইনে শেষ করতে ভুলে গেছেন।",
      solutionSteps: [
        detectedLine
          ? `লাইন নম্বর ${detectedLine}-এ লেখার শেষ প্রান্তে একটি ডাবল কোটেশন (\") দিন।`
          : "লেখার শেষে একটি ডাবল কোটেশন (\") যোগ করে স্ট্রিংটি বন্ধ করুন।",
        "যদি টেক্সট একাধিক লাইনে লিখতে চান, তবে প্লাস (+) চিহ্ন দিয়ে জোড়া দিন অথবা টেক্সট ব্লক (\"\"\") ব্যবহার করুন।",
      ],
      codeTip: 'System.out.println("হ্যালো জাভা শিক্ষার্থী!"); // দুই পাশেই " থাকতে হবে',
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 3. Braces & Parentheses mismatch (বন্ধনী অসম্পূর্ণ)
  if (
    text.includes("reached end of file while parsing") ||
    text.includes("'}' expected") ||
    text.includes("')' expected") ||
    text.includes("']' expected") ||
    text.includes("unexpected '}'") ||
    text.includes("unexpected ')'")
  ) {
    return {
      title: "বন্ধনী বা ব্র্যাকেট অসম্পূর্ণ রয়েছে",
      category: "Syntax Error",
      line: detectedLine,
      explanation:
        "জাভাতে প্রতিটি শুরুর বন্ধনীর { ( [ বিপরীতে একটি সমাপ্তি বন্ধনী } ) ] থাকতে হয়। আপনার কোডে কোনো একটি ব্র্যাকেট বন্ধ করতে ভুলে গেছেন বা অতিরিক্ত বন্ধনী দিয়ে ফেলেছেন।",
      solutionSteps: [
        "ক্লাসের শুরুর { এবং মেইন মেথডের শুরুর { এর জন্য সবার শেষে দুটি } বন্ধনী আছে কি না দেখুন।",
        "System.out.println( বা if ( ইত্যাদি খোলার পর শেষে ঠিকমতো ) বন্ধনী দেওয়া হয়েছে কি না নিশ্চিত করুন।",
        "কোডটি সুন্দর করে ইন্ডেন্ট (Indentation) করলে কোন ব্র্যাকেট কোথায় শেষ হয়েছে তা সহজে ধরা পড়ে।",
      ],
      codeTip:
        "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"বন্ধনী সঠিকভাবে মিলান\");\n    } // মেথড শেষ\n} // ক্লাস শেষ",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 4. Scanner related issues
  if (text.includes("class scanner") && (text.includes("cannot find symbol") || text.includes("cannot resolve"))) {
    return {
      title: "Scanner ক্লাস ইম্পোর্ট করা হয়নি",
      category: "Compilation Error",
      line: detectedLine,
      explanation:
        "জাভাতে ইউজারের কাছ থেকে ইনপুট নেওয়ার Scanner ক্লাসটি ব্যবহার করতে হলে প্রোগ্রামের সবার উপরে java.util প্যাকেজ থেকে Scanner ইম্পোর্ট করতে হয়।",
      solutionSteps: [
        "কোডের সবার উপরে অর্থাৎ ১ম লাইনে লিখুন: import java.util.Scanner;",
        "এরপর main মেথডের ভেতর Scanner অবজেক্ট তৈরি করুন: Scanner sc = new Scanner(System.in);",
      ],
      codeTip: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n    }\n}",
      faultyCodeSnippet: faultySnippet,
    };
  }

  if (
    (text.includes("variable scanner") || text.includes("variable sc")) &&
    text.includes("cannot find symbol")
  ) {
    return {
      title: "Scanner অবজেক্ট তৈরি (Declare) করা হয়নি",
      category: "Compilation Error",
      line: detectedLine,
      explanation:
        "আপনি sc.nextInt() বা sc.nextLine() ব্যবহার করেছেন, কিন্তু তার আগে 'Scanner sc = new Scanner(System.in);' লিখে অবজেক্টটি ডিক্লেয়ার করেননি।",
      solutionSteps: [
        "ইনপুট নেওয়ার লাইনের আগে 'Scanner sc = new Scanner(System.in);' লিখুন।",
        "ফাইলের শুরুতে 'import java.util.Scanner;' রয়েছে কি না তা নিশ্চিত করুন।",
      ],
      codeTip: "Scanner sc = new Scanner(System.in);\nint age = sc.nextInt();",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 5. Typo in System.out.println
  if (text.includes("method printl") || text.includes("println method") || text.includes("cannot find symbol: method printl")) {
    return {
      title: "printl মেথডের বানানে ভুল (println হবে)",
      category: "Compilation Error",
      line: detectedLine,
      explanation:
        "জাভাতে কনসোলে আউটপুট দেখানোর জন্য 'println' অথবা 'print' লিখতে হয়। আপনি ভুলবশত 'printl' লিখেছেন (n বর্ণটি বাদ পড়েছে)।",
      solutionSteps: [
        detectedLine
          ? `লাইন ${detectedLine}-এ 'System.out.printl' পরিবর্তন করে 'System.out.println' লিখুন।`
          : "'System.out.printl'-এর শেষে 'n' যোগ করে 'System.out.println' লিখুন।",
      ],
      codeTip: "System.out.println(\"সঠিক বানান println\");",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 6. Scanner method case sensitivity (nextint vs nextInt)
  if (text.includes("method nextint") || text.includes("method nextline") || text.includes("method nextdouble")) {
    return {
      title: "মেথডের বড়/ছোট হাতের অক্ষর ভুল (Case-Sensitive)",
      category: "Compilation Error",
      line: detectedLine,
      explanation:
        "জাভা একটি Case-Sensitive প্রোগ্রামিং ভাষা, অর্থাৎ বড় হাতের ও ছোট হাতের অক্ষর ভিন্ন অর্থ বহন করে। Scanner-এর ইনপুট মেথডগুলোতে ক্যামেল কেস (camelCase) ব্যবহার করতে হয়।",
      solutionSteps: [
        "nextInt() - এখানে 'I' অবশ্যই বড় হাতের (Capital) হতে হবে।",
        "nextLine() - এখানে 'L' অবশ্যই বড় হাতের (Capital) হতে হবে।",
        "nextDouble() - এখানে 'D' অবশ্যই বড় হাতের (Capital) হতে হবে।",
      ],
      codeTip: "int number = sc.nextInt(); // 'I' বড় হাতের\nString name = sc.nextLine(); // 'L' বড় হাতের",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 7. General Cannot find symbol
  if (text.includes("cannot find symbol") || text.includes("cannot resolve symbol")) {
    const symbolMatch = errorOutput.match(/symbol:\s*(?:variable|class|method)\s+([A-Za-z0-9_$]+)/i);
    const symbolName = symbolMatch ? symbolMatch[1] : "উপাদানটি";
    return {
      title: `'${symbolName}' খুঁজে পাওয়া যাচ্ছে না (Cannot Find Symbol)`,
      category: "Compilation Error",
      line: detectedLine,
      explanation: `জাভা কম্পাইলার '${symbolName}' নামের কোনো ভেরিয়েবল, ক্লাস বা মেথড খুঁজে পাচ্ছে না। হয়তো নামটি আগে তৈরি করা হয়নি অথবা বানানে বা বড়/ছোট হাতের অক্ষরে ভুল রয়েছে।`,
      solutionSteps: [
        `'${symbolName}' বানানটি সম্পূর্ণ সঠিক আছে কি না এবং বড়/ছোট হাতের অক্ষর ঠিক আছে কি না নিশ্চিত করুন।`,
        `ভেরিয়েবল ব্যবহারের আগে তার ডেটা টাইপ দিয়ে ঘোষণা (Declare) ও ইনিশিয়ালাইজ করেছেন কি না দেখুন।`,
        "অন্য কোনো ক্লাসের জিনিস হলে তা ইম্পোর্ট (import) করা হয়েছে কি না পরীক্ষা করুন।",
      ],
      codeTip: `// ভেরিয়েবল ব্যবহারের পূর্বে টাইপসহ ডিক্লেয়ার করুন:\nint ${symbolName === "উপাদানটি" ? "score" : symbolName} = 100;`,
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 8. Incompatible types (Type Mismatch)
  if (text.includes("incompatible types") || text.includes("possible lossy conversion")) {
    return {
      title: "ডেটা টাইপ মিলছে না (Type Mismatch)",
      category: "Type Error",
      line: detectedLine,
      explanation:
        "জাভাতে ভেরিয়েবলের ডেটা টাইপ এবং তার অ্যাসাইন করা মানের ডেটা টাইপ একই হতে হয়। আপনি একটি ডেটা টাইপের ভেতর ভিন্ন ডেটা টাইপের মান রাখতে চেষ্টা করেছেন।",
      solutionSteps: [
        "বাম পাশের ভেরিয়েবলের ধরন (int, String, double ইত্যাদি) এবং ডান পাশের মানের ধরন মিলিয়ে নিন।",
        "যেমন: int ভেরিয়েবলে কখনো উদ্ধৃতি চিহ্নের ভেতর লেখা (\"123\") রাখা যায় না।",
        "স্ট্রিংকে সংখ্যায় রূপান্তর করতে 'Integer.parseInt(str)' বা 'Double.parseDouble(str)' ব্যবহার করুন।",
      ],
      codeTip: "int count = 10; // সংখ্যা রাখতে int\nString text = \"10\"; // লেখা রাখতে String\nint parsed = Integer.parseInt(text); // রূপান্তর",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 9. Main method missing or invalid
  if (text.includes("main method not found") || text.includes("main method signature")) {
    return {
      title: "মেইন মেথড (main method) পাওয়া যায়নি বা ভুল রয়েছে",
      category: "Compilation Error",
      line: detectedLine,
      explanation:
        "জাভা প্রোগ্রাম চালু করার জন্য একটি নির্দিষ্ট চিহ্নের মেইন মেথড থাকতে হয়। আপনার ক্লাসে এই মেথডটি নেই অথবা এর স্বাক্ষরে (Signature) ভুল রয়েছে।",
      solutionSteps: [
        "আপনার ক্লাসের ভেতর হুবহু এই মেথডটি লিখুন: public static void main(String[] args) { ... }",
        "খেয়াল রাখবেন: public, static ও void সবগুলো ছোট হাতের হবে এবং String-এর 'S' বড় হাতের হবে।",
      ],
      codeTip: "public class Main {\n    public static void main(String[] args) {\n        // আপনার কোড এখানে লিখুন\n    }\n}",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 10. Class / Interface / Enum expected
  if (text.includes("class, interface, or enum expected")) {
    return {
      title: "ক্লাস ডিক্লারেশন পাওয়া যায়নি (Class Expected)",
      category: "Syntax Error",
      line: detectedLine,
      explanation:
        "জাভাতে যেকোনো কোড অবশ্যই একটি ক্লাসের ভেতরে থাকতে হয়। ক্লাসের বাইরে সরাসরি কোড লেখা যায় না। অথবা কোনো অতিরিক্ত বন্ধনী '}' বাইরে পড়ে গেছে।",
      solutionSteps: [
        "সমস্ত কোডকে একটি ক্লাসের ভেতরে রাখুন, যেমন: public class Main { ... }",
        "ক্লাসের বাইরে কোনো অতিরিক্ত বন্ধনী '}' বা কোড লেখা থাকলে তা সরিয়ে ফেলুন।",
      ],
      codeTip: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"কোড সর্বদা ক্লাসের ভেতরে থাকবে\");\n    }\n}",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 11. Division by Zero (ArithmeticException)
  if (text.includes("arithmeticexception") || text.includes("/ by zero")) {
    return {
      title: "শূন্য (0) দিয়ে ভাগ করা সম্ভব নয় (ArithmeticException)",
      category: "Runtime Exception",
      line: detectedLine,
      explanation:
        "গণিতের নিয়ম অনুসারে কোনো সংখ্যাকে শূন্য (0) দিয়ে ভাগ করলে ফলাফল অসংজ্ঞায়িত হয়। জাভাতে কোনো সংখ্যাকে শূন্য দিয়ে ভাগ করার চেষ্টা করলে এই রানটাইম এক্সেপশন ঘটে।",
      solutionSteps: [
        "ভাগ করার আগে নিশ্চিত হোন যে ভাজক (Divisor) শূন্য নয়।",
        "কোডে একটি if শর্ত যোগ করুন: if (divisor != 0) { ... }",
      ],
      codeTip: "int a = 10;\nint b = 2; // b এর মান 0 হতে পারবে না\nif (b != 0) {\n    int result = a / b;\n    System.out.println(result);\n}",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 12. Array Index Out Of Bounds
  if (text.includes("arrayindexoutofboundsexception")) {
    const idxMatch = errorOutput.match(/Index\s+(\d+)\s+out\s+of\s+bounds/i);
    const indexStr = idxMatch ? idxMatch[1] : "N";
    return {
      title: `অ্যারের সীমার বাইরে ইনডেক্স ব্যবহার করা হয়েছে (Index: ${indexStr})`,
      category: "Runtime Exception",
      line: detectedLine,
      explanation: `জাভাতে অ্যারের ইনডেক্স ০ থেকে শুরু হয় এবং শেষ ইনডেক্স হলো (length - 1)। আপনি ${indexStr} নম্বর ইনডেক্স অ্যাক্সেস করতে চেয়েছেন যা অ্যারের আকারের বাইরে।`,
      solutionSteps: [
        "লুপের শর্তে 'i <= array.length' এর পরিবর্তে সর্বদা 'i < array.length' ব্যবহার করুন।",
        "অ্যারেতে ৩টি উপাদান থাকলে তার বৈধ ইনডেক্স ০, ১ ও ২।",
      ],
      codeTip: "int[] numbers = {10, 20, 30};\nfor (int i = 0; i < numbers.length; i++) {\n    System.out.println(numbers[i]);\n}",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // 13. NullPointerException
  if (text.includes("nullpointerexception")) {
    return {
      title: "খালি বা নাল (null) অবজেক্ট অ্যাক্সেসের চেষ্টা",
      category: "Runtime Exception",
      line: detectedLine,
      explanation:
        "যে অবজেক্টটি এখনও মেমোরিতে তৈরি করা হয়নি বা যার মান null, তার কোনো মেথড কল করার বা উপাদান পড়ার চেষ্টা করা হয়েছে।",
      solutionSteps: [
        "অবজেক্ট ব্যবহারের আগে 'new' কি-ওয়ার্ড দিয়ে সেটি তৈরি (Initialize) করেছেন কি না নিশ্চিত করুন।",
        "প্রয়োজনে মেথড কল করার আগে if (obj != null) দিয়ে পরীক্ষা করুন।",
      ],
      codeTip: "String text = \"\"; // null এর বদলে খালি স্ট্রিং দিতে পারেন\nSystem.out.println(text.length());",
      faultyCodeSnippet: faultySnippet,
    };
  }

  // Default Fallback
  const isRuntimeException = text.includes("exception") || text.includes("error in thread");
  return {
    title: isRuntimeException
      ? "রানটাইম এক্সেপশন (Runtime Exception)"
      : "কোডে ত্রুটি পাওয়া গেছে (Compilation Issue)",
    category: isRuntimeException ? "Runtime Exception" : "Compilation Error",
    line: detectedLine,
    explanation: errorOutput.split("\n")[0] || (isRuntimeException ? "প্রোগ্রামটি চলার সময় রানটাইম ত্রুটি ঘটেছে।" : "জাভা কোডটি কম্পাইল করার সময় ত্রুটি ধরা পড়েছে।"),
    solutionSteps: [
      detectedLine
        ? `লাইন নম্বর ${detectedLine}-এর কোডটি মনোযোগ দিয়ে দেখুন।`
        : "টার্মিনালের লাল রঙের ত্রুটি বার্তাটি দেখে ভুল সংশোধন করুন।",
      "সেমিকোলন (;), বন্ধনী {}, কোটেশন (\") এবং মেথডের বানান ঠিক আছে কি না নিশ্চিত করুন।",
      "প্রয়োজনে উপরের 'Original' বাটনে ক্লিক করে মূল সঠিক কোডটি পুনরায় দেখতে পারেন।",
    ],
    codeTip: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"সঠিক কোড\");\n    }\n}",
    faultyCodeSnippet: faultySnippet,
  };
}
