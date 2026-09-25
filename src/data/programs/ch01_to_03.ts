import { JavaProgram } from "../../types";

export const ch01_to_03_programs: JavaProgram[] = [
  // CHAPTER 1: Java Basics & First Programs (1-7)
  {
    id: "prog-1",
    title: "Hello World & Welcome Message",
    bengaliTitle: "",
    chapter: 1,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Basics",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java Master Pro Digital Lab!");
        System.out.println("");
    }
}`,
    expectedOutput: `Hello, World!\nWelcome to Java Master Pro Digital Lab!\n`,
    explanation: "System.out.println()",
    keyPoints: [
      "  Main",
      "main()",
      "  (;)",
    ],
    tags: ["basics", "print", "hello-world"],
  },
  {
    id: "prog-2",
    title: "Print vs Println Demonstration",
    bengaliTitle: "print()   println()",
    chapter: 1,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Basics",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.print("Java ");
        System.out.print("is ");
        System.out.print("Powerful! ");
        System.out.println("-> Same Line Finish");
        System.out.println("This starts in a completely new line.");
    }
}`,
    expectedOutput: `Java is Powerful! -> Same Line Finish\nThis starts in a completely new line.`,
    explanation: "print()  , println()",
    keyPoints: [
      "print()",
      "println()",
    ],
    tags: ["basics", "console", "io"],
  },
  {
    id: "prog-3",
    title: "Escape Sequences in Java",
    bengaliTitle: "  (\\n, \\t, \\\")",
    chapter: 1,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Basics",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Item\\t\\tQuantity\\tPrice");
        System.out.println("Keyboard\\t1\\t\\t$45.00");
        System.out.println("Mouse\\t\\t2\\t\\t$25.00");
        System.out.println("He said, \\"Java 17 is awesome!\\"");
    }
}`,
    expectedOutput: `Item\t\tQuantity\tPrice\nKeyboard\t1\t\t$45.00\nMouse\t\t2\t\t$25.00\nHe said, "Java 17 is awesome!"`,
    explanation: "  \\t (  \\n (",
    keyPoints: ["\\t  ", "\\\""],
    tags: ["basics", "strings", "formatting"],
  },
  {
    id: "prog-4",
    title: "Java Single-line and Multi-line Comments",
    bengaliTitle: "",
    chapter: 1,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Basics",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        // 
        System.out.println("Testing code comments...");
        /*
         * 
         * 
         */
        int activeUsers = 120;
        System.out.println("Active platform users: " + activeUsers);
    }
}`,
    expectedOutput: `Testing code comments...\nActive platform users: 120`,
    explanation: "",
    keyPoints: ["//  ", "/* ... */"],
    tags: ["basics", "comments"],
  },
  {
    id: "prog-5",
    title: "Simple Arithmetic Expressions in Print",
    bengaliTitle: "",
    chapter: 1,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Basics",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Addition: " + (50 + 25));
        System.out.println("Subtraction: " + (50 - 25));
        System.out.println("Multiplication: " + (6 * 7));
        System.out.println("Division: " + (100 / 4));
    }
}`,
    expectedOutput: `Addition: 75\nSubtraction: 25\nMultiplication: 42\nDivision: 25`,
    explanation: "  (50 + 25)",
    keyPoints: ["  '50' + 25   5025"],
    tags: ["basics", "math"],
  },
  {
    id: "prog-6",
    title: "Formatted Console Output with printf",
    bengaliTitle: "printf()",
    chapter: 1,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Basics",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        String studentName = "Rahim";
        int studentId = 101;
        double gpa = 3.875;
        System.out.printf("Student ID: %05d | Name: %-10s | GPA: %.2f\n", studentId, studentName, gpa);
    }
}`,
    expectedOutput: `Student ID: 00101 | Name: Rahim      | GPA: 3.88`,
    explanation: "printf()   %d, %s, %.2f",
    keyPoints: ["%05d  ", "%.2f"],
    tags: ["basics", "formatting", "printf"],
  },
  {
    id: "prog-7",
    title: "Checking Java System Properties",
    bengaliTitle: "",
    chapter: 1,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Basics",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("OS Name: " + System.getProperty("os.name"));
        System.out.println("File Encoding: " + System.getProperty("file.encoding"));
    }
}`,
    expectedOutput: `Java Version: 17.0.2\nOS Name: Linux\nFile Encoding: UTF-8`,
    explanation: "System.getProperty()",
    keyPoints: [""],
    tags: ["system", "jvm", "runtime"],
  },
  // CHAPTER 2: Variables & Data Types (8-14)
  {
    id: "prog-8",
    title: "Primitive Data Types and Bit Range",
    bengaliTitle: "",
    chapter: 2,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Data Types",
    description: "byte, short, int, long, float, double, char   boolean",
    code: `public class Main {
    public static void main(String[] args) {
        byte smallNum = 127;
        short mediumNum = 32000;
        int standardNum = 2000000;
        long hugeNum = 9000000000000L;
        float price = 19.99f;
        double pi = 3.1415926535;
        char grade = 'A';
        boolean isEnrolled = true;
        System.out.println("Byte: " + smallNum);
        System.out.println("Short: " + mediumNum);
        System.out.println("Int: " + standardNum);
        System.out.println("Long: " + hugeNum);
        System.out.println("Float: " + price);
        System.out.println("Double: " + pi);
        System.out.println("Char: " + grade);
        System.out.println("Boolean: " + isEnrolled);
    }
}`,
    expectedOutput: `Byte: 127\nShort: 32000\nInt: 2000000\nLong: 9000000000000\nFloat: 19.99\nDouble: 3.1415926535\nChar: A\nBoolean: true`,
    explanation: " , long   'L'   float   'f'",
    keyPoints: [""],
    tags: ["datatypes", "primitives", "variables"],
  },
  {
    id: "prog-9",
    title: "Implicit and Explicit Type Casting",
    bengaliTitle: "  (Widening   Narrowing)",
    chapter: 2,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Data Types",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        // Widening Casting (
        int integerVal = 100;
        double doubleVal = integerVal;
        // Narrowing Casting (
        double score = 98.75;
        int roundedScore = (int) score;
        System.out.println("Widening: " + integerVal + " -> " + doubleVal);
        System.out.println("Narrowing: " + score + " -> " + roundedScore);
    }
}`,
    expectedOutput: `Widening: 100 -> 100.0\nNarrowing: 98.75 -> 98`,
    explanation: "",
    keyPoints: ["Narrowing"],
    tags: ["casting", "datatypes"],
  },
  {
    id: "prog-10",
    title: "String Immutability and Reference Memory",
    bengaliTitle: "",
    chapter: 2,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Data Types",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        String str1 = "Java";
        str1.concat(" Master");
        System.out.println("Without assignment: " + str1);
        str1 = str1.concat(" Master Pro");
        System.out.println("With reassignment: " + str1);
    }
}`,
    expectedOutput: `Without assignment: Java\nWith reassignment: Java Master Pro`,
    explanation: "String   concat",
    keyPoints: ["String Pool"],
    tags: ["string", "immutability", "memory"],
  },
  {
    id: "prog-11",
    title: "Java 10+ Local Variable Type Inference (var)",
    bengaliTitle: "var   (Local Variable Type Inference)",
    chapter: 2,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Data Types",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        var count = 50; // int
        var rate = 4.75; // double
        var title = "Data Structures"; // String
        var isAvailable = false; // boolean
        System.out.println(title + " | Copies: " + count + " | Rating: " + rate + " | Available: " + isAvailable);
    }
}`,
    expectedOutput: `Data Structures | Copies: 50 | Rating: 4.75 | Available: false`,
    explanation: "var",
    keyPoints: ["var"],
    tags: ["java10", "var", "modern-java"],
  },
  {
    id: "prog-12",
    title: "Constants using the final Keyword",
    bengaliTitle: "  (final",
    chapter: 2,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Data Types",
    description: "  final",
    code: `public class Main {
    public static void main(String[] args) {
        final double GRAVITY = 9.80665;
        final int MAX_ATTEMPTS = 3;
        System.out.println("Earth Gravity: " + GRAVITY + " m/s^2");
        System.out.println("Maximum Login Attempts: " + MAX_ATTEMPTS);
    }
}`,
    expectedOutput: `Earth Gravity: 9.80665 m/s^2\nMaximum Login Attempts: 3`,
    explanation: "final",
    keyPoints: ["  UPPERCASE"],
    tags: ["final", "constants"],
  },
  {
    id: "prog-13",
    title: "Wrapper Classes and Autoboxing",
    bengaliTitle: "  (Autoboxing/Unboxing)",
    chapter: 2,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Data Types",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int primitiveX = 42;
        Integer objectX = primitiveX; // Autoboxing
        int unboxedX = objectX; // Auto-unboxing
        System.out.println("Object Value: " + objectX);
        System.out.println("Unboxed Primitive: " + unboxedX);
        System.out.println("Max Integer: " + Integer.MAX_VALUE);
    }
}`,
    expectedOutput: `Object Value: 42\nUnboxed Primitive: 42\nMax Integer: 2147483647`,
    explanation: "  (Integer, Double)",
    keyPoints: ["Autoboxing"],
    tags: ["wrapper", "autoboxing"],
  },
  {
    id: "prog-14",
    title: "Parsing Strings to Numbers",
    bengaliTitle: "  (Parsing)",
    chapter: 2,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Data Types",
    description: "Integer.parseInt()   Double.parseDouble()",
    code: `public class Main {
    public static void main(String[] args) {
        String countStr = "150";
        String priceStr = "24.99";
        int count = Integer.parseInt(countStr);
        double price = Double.parseDouble(priceStr);
        double total = count * price;
        System.out.printf("Total Cost for %d items at $%.2f: $%.2f\n", count, price, total);
    }
}`,
    expectedOutput: `Total Cost for 150 items at $24.99: $3748.50`,
    explanation: "",
    keyPoints: ["  NumberFormatException"],
    tags: ["parsing", "strings", "conversion"],
  },
  // CHAPTER 3: Operators & Expressions (15-21)
  {
    id: "prog-15",
    title: "Arithmetic and Modulus Operators",
    bengaliTitle: "",
    chapter: 3,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Operators",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int dividend = 29;
        int divisor = 4;
        int quotient = dividend / divisor;
        int remainder = dividend % divisor;
        System.out.println("Dividend: " + dividend);
        System.out.println("Divisor: " + divisor);
        System.out.println("Quotient: " + quotient);
        System.out.println("Remainder (Modulus): " + remainder);
    }
}`,
    expectedOutput: `Dividend: 29\nDivisor: 4\nQuotient: 7\nRemainder (Modulus): 1`,
    explanation: "  (%)",
    keyPoints: [" : (num % 2 == 0)"],
    tags: ["operators", "arithmetic", "modulus"],
  },
  {
    id: "prog-16",
    title: "Prefix vs Postfix Increment & Decrement",
    bengaliTitle: "  (++x   x++)",
    chapter: 3,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Operators",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int a = 5;
        int b = 5;
        int postResult = a++; // 
        int preResult = ++b;  // 
        System.out.println("Postfix: result=" + postResult + ", new a=" + a);
        System.out.println("Prefix:  result=" + preResult + ", new b=" + b);
    }
}`,
    expectedOutput: `Postfix: result=5, new a=6\nPrefix:  result=6, new b=6`,
    explanation: "Postfix  , Prefix",
    keyPoints: [""],
    tags: ["operators", "increment", "decrement"],
  },
  {
    id: "prog-17",
    title: "Short-Circuit Logical Operators (&& and ||)",
    bengaliTitle: "  (&&   ||)",
    chapter: 3,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Operators",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int balance = 50;
        int withdraw = 100;
        // 
        if (balance >= withdraw && (10 / 0 == 0)) {
            System.out.println("Withdrawal approved!");
        } else {
            System.out.println("Withdrawal rejected safely without ArithmeticException!");
        }
    }
}`,
    expectedOutput: `Withdrawal rejected safely without ArithmeticException!`,
    explanation: "  &&   false",
    keyPoints: [""],
    tags: ["operators", "logical", "short-circuit"],
  },
  {
    id: "prog-18",
    title: "Ternary Conditional Operator (? :)",
    bengaliTitle: "  (? :)",
    chapter: 3,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Operators",
    description: "  if-else",
    code: `public class Main {
    public static void main(String[] args) {
        int marks = 78;
        String status = (marks >= 40) ? "Passed with Credit" : "Failed";
        int num = -15;
        String sign = (num >= 0) ? "Positive" : "Negative";
        System.out.println("Result: " + status);
        System.out.println("Number Sign: " + sign);
    }
}`,
    expectedOutput: `Result: Passed with Credit\nNumber Sign: Negative`,
    explanation: "  '?'   ':'",
    keyPoints: [""],
    tags: ["operators", "ternary", "conditional"],
  },
  {
    id: "prog-19",
    title: "Bitwise Shift and Masking Operators",
    bengaliTitle: "",
    chapter: 3,
    chapterTitle: "",
    difficulty: "advanced",
    category: "Operators",
    description: "  (<<, >>)   AND/OR",
    code: `public class Main {
    public static void main(String[] args) {
        int n = 8; // Binary: 1000
        int leftShift = n << 2;  // 8 * 4 = 32
        int rightShift = n >> 1; // 8 / 2 = 4
        int mask = 0b1010;
        int value = 0b1100;
        int bitwiseAnd = value & mask;
        System.out.println("8 Left-shifted by 2: " + leftShift);
        System.out.println("8 Right-shifted by 1: " + rightShift);
        System.out.println("Bitwise AND result: " + bitwiseAnd);
    }
}`,
    expectedOutput: `8 Left-shifted by 2: 32\n8 Right-shifted by 1: 4\nBitwise AND result: 8`,
    explanation: "Left shift (<< k)   2^k  , Right shift (>> k)",
    keyPoints: [""],
    tags: ["bitwise", "binary", "operators"],
  },
  {
    id: "prog-20",
    title: "Compound Assignment Operators",
    bengaliTitle: "  (+=, -=, *=, /=)",
    chapter: 3,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Operators",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int score = 100;
        score += 25; // score = score + 25
        System.out.println("After += : " + score);
        score *= 2;  // score = score * 2
        System.out.println("After *= : " + score);
        score /= 5;  // score = score / 5
        System.out.println("After /= : " + score);
    }
}`,
    expectedOutput: `After += : 125\nAfter *= : 250\nAfter /= : 50`,
    explanation: "",
    keyPoints: [""],
    tags: ["operators", "assignment"],
  },
  {
    id: "prog-21",
    title: "Operator Precedence and Evaluation Order",
    bengaliTitle: "",
    chapter: 3,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Operators",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int result1 = 10 + 20 * 3;     // 10 + 60 = 70
        int result2 = (10 + 20) * 3;   // 30 * 3 = 90
        boolean logic = 10 > 5 && 8 < 20 || 3 == 4;
        System.out.println("Without Parentheses: " + result1);
        System.out.println("With Parentheses: " + result2);
        System.out.println("Complex Logical Precedence: " + logic);
    }
}`,
    expectedOutput: `Without Parentheses: 70\nWith Parentheses: 90\nComplex Logical Precedence: true`,
    explanation: "",
    keyPoints: ["  ()"],
    tags: ["precedence", "operators", "math"],
  },
];
