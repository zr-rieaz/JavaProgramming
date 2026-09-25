import { JavaProgram } from "../../types";

export const ch04_to_06_programs: JavaProgram[] = [
  // CHAPTER 4: Conditional Logic & Control Flow (22-28)
  {
    id: "prog-22",
    title: "Simple If-Else Even or Odd Checker",
    bengaliTitle: "  (if-else)",
    chapter: 4,
    chapterTitle: "  (if-else, switch)",
    difficulty: "beginner",
    category: "Control Flow",
    description: "  if-else",
    code: `public class Main {
    public static void main(String[] args) {
        int number = 47;
        if (number % 2 == 0) {
            System.out.println(number + " is an EVEN number.");
        } else {
            System.out.println(number + " is an ODD number.");
        }
    }
}`,
    expectedOutput: `47 is an ODD number.`,
    explanation: "  (Even),   (Odd)",
    keyPoints: ["  (true/false)"],
    tags: ["conditions", "if-else", "basics"],
  },
  {
    id: "prog-23",
    title: "Grading System with If-Else Ladder",
    bengaliTitle: "  (if-else-if ladder)",
    chapter: 4,
    chapterTitle: "  (if-else, switch)",
    difficulty: "beginner",
    category: "Control Flow",
    description: "  A+, A, B, C, F",
    code: `public class Main {
    public static void main(String[] args) {
        int marks = 85;
        char grade;
        if (marks >= 80) {
            grade = 'A';
        } else if (marks >= 70) {
            grade = 'B';
        } else if (marks >= 60) {
            grade = 'C';
        } else if (marks >= 50) {
            grade = 'D';
        } else {
            grade = 'F';
        }
        System.out.println("Marks: " + marks + " | Grade Awarded: " + grade);
    }
}`,
    expectedOutput: `Marks: 85 | Grade Awarded: A`,
    explanation: "if-else if",
    keyPoints: [""],
    tags: ["conditions", "grading", "ladder"],
  },
  {
    id: "prog-24",
    title: "Find Largest of Three Numbers with Nested If",
    bengaliTitle: "",
    chapter: 4,
    chapterTitle: "  (if-else, switch)",
    difficulty: "intermediate",
    category: "Control Flow",
    description: "  &&",
    code: `public class Main {
    public static void main(String[] args) {
        int x = 65, y = 92, z = 43;
        int largest;
        if (x >= y && x >= z) {
            largest = x;
        } else if (y >= x && y >= z) {
            largest = y;
        } else {
            largest = z;
        }
        System.out.println("Numbers: " + x + ", " + y + ", " + z);
        System.out.println("The Largest Number is: " + largest);
    }
}`,
    expectedOutput: `Numbers: 65, 92, 43\nThe Largest Number is: 92`,
    explanation: "  AND (&&)",
    keyPoints: ["Math.max(x, Math.max(y, z))"],
    tags: ["conditions", "comparison", "logic"],
  },
  {
    id: "prog-25",
    title: "Traditional Switch Case with Break",
    bengaliTitle: "  (Traditional Switch)",
    chapter: 4,
    chapterTitle: "  (if-else, switch)",
    difficulty: "beginner",
    category: "Control Flow",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int day = 4;
        String dayName;
        switch (day) {
            case 1: dayName = "Saturday"; break;
            case 2: dayName = "Sunday"; break;
            case 3: dayName = "Monday"; break;
            case 4: dayName = "Tuesday"; break;
            case 5: dayName = "Wednesday"; break;
            case 6: dayName = "Thursday"; break;
            case 7: dayName = "Friday"; break;
            default: dayName = "Invalid Day"; break;
        }
        System.out.println("Day " + day + " corresponds to: " + dayName);
    }
}`,
    expectedOutput: `Day 4 corresponds to: Tuesday`,
    explanation: "  break   (fall-through)",
    keyPoints: ["default"],
    tags: ["switch", "control-flow"],
  },
  {
    id: "prog-26",
    title: "Modern Java 14+ Enhanced Switch Expression",
    bengaliTitle: "  (Enhanced Switch)",
    chapter: 4,
    chapterTitle: "  (if-else, switch)",
    difficulty: "intermediate",
    category: "Control Flow",
    description: "  (->)",
    code: `public class Main {
    public static void main(String[] args) {
        String role = "ADMIN";
        String permission = switch (role) {
            case "ADMIN" -> "Full Administrative & System Access";
            case "EDITOR", "MODERATOR" -> "Content Editing & Moderation Access";
            case "USER" -> "Read-only Standard User Access";
            default -> "Restricted Guest Access";
        };
        System.out.println("User Role: " + role);
        System.out.println("Granted Permission: " + permission);
    }
}`,
    expectedOutput: `User Role: ADMIN\nGranted Permission: Full Administrative & System Access`,
    explanation: "  break",
    keyPoints: [""],
    tags: ["switch", "modern-java", "java14"],
  },
  {
    id: "prog-27",
    title: "Leap Year Calculation with Multiple Rules",
    bengaliTitle: "  (Leap Year)",
    chapter: 4,
    chapterTitle: "  (if-else, switch)",
    difficulty: "intermediate",
    category: "Control Flow",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int year = 2024;
        boolean isLeapYear = false;
        if (year % 4 == 0) {
            if (year % 100 == 0) {
                isLeapYear = (year % 400 == 0);
            } else {
                isLeapYear = true;
            }
        }
        System.out.println("Year " + year + " is Leap Year: " + isLeapYear);
    }
}`,
    expectedOutput: `Year 2024 is Leap Year: true`,
    explanation: "",
    keyPoints: [" : (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)"],
    tags: ["conditions", "math", "leap-year"],
  },
  {
    id: "prog-28",
    title: "Tax Bracket Calculator",
    bengaliTitle: "",
    chapter: 4,
    chapterTitle: "  (if-else, switch)",
    difficulty: "intermediate",
    category: "Control Flow",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        double income = 550000;
        double tax = 0;
        if (income <= 300000) {
            tax = 0;
        } else if (income <= 500000) {
            tax = (income - 300000) * 0.05;
        } else {
            tax = (200000 * 0.05) + (income - 500000) * 0.10;
        }
        System.out.printf("Taxable Income: $%.2f\n", income);
        System.out.printf("Total Payable Tax: $%.2f\n", tax);
    }
}`,
    expectedOutput: `Taxable Income: $550000.00\nTotal Payable Tax: $15000.00`,
    explanation: "",
    keyPoints: [""],
    tags: ["conditions", "finance", "tax"],
  },
  // CHAPTER 5: Loops & Iterations (29-35)
  {
    id: "prog-29",
    title: "Standard For Loop - Multiplication Table",
    bengaliTitle: "  (for loop)",
    chapter: 5,
    chapterTitle: "  (Loops & Iteration)",
    difficulty: "beginner",
    category: "Loops",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int n = 7;
        System.out.println("Multiplication Table of " + n + ":\\n");
        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + (n * i));
        }
    }
}`,
    expectedOutput: `Multiplication Table of 7:\n\n7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70`,
    explanation: "for",
    keyPoints: ["  i, j, k"],
    tags: ["loops", "for-loop", "math"],
  },
  {
    id: "prog-30",
    title: "While Loop - Sum of Digits of a Number",
    bengaliTitle: "  (while loop)",
    chapter: 5,
    chapterTitle: "  (Loops & Iteration)",
    difficulty: "beginner",
    category: "Loops",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int number = 9845;
        int original = number;
        int sum = 0;
        while (number > 0) {
            int lastDigit = number % 10;
            sum += lastDigit;
            number /= 10;
        }
        System.out.println("Original Number: " + original);
        System.out.println("Sum of Digits: " + sum);
    }
}`,
    expectedOutput: `Original Number: 9845\nSum of Digits: 26`,
    explanation: "number % 10   number /= 10",
    keyPoints: ["  while"],
    tags: ["loops", "while-loop", "digits"],
  },
  {
    id: "prog-31",
    title: "Do-While Loop Guaranteed First Execution",
    bengaliTitle: "  (do-while)",
    chapter: 5,
    chapterTitle: "  (Loops & Iteration)",
    difficulty: "beginner",
    category: "Loops",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int count = 10;
        do {
            System.out.println("Inside do-while: count is " + count);
            count++;
        } while (count < 5); // 
        System.out.println("Loop terminated. Final count: " + count);
    }
}`,
    expectedOutput: `Inside do-while: count is 10\nLoop terminated. Final count: 11`,
    explanation: "do-while",
    keyPoints: ["  do-while"],
    tags: ["loops", "do-while"],
  },
  {
    id: "prog-32",
    title: "Nested Loops - Right Angled Star Pattern",
    bengaliTitle: "  (Nested Loops)",
    chapter: 5,
    chapterTitle: "  (Loops & Iteration)",
    difficulty: "intermediate",
    category: "Loops",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int rows = 5;
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
    expectedOutput: `* \n* * \n* * * \n* * * * \n* * * * * `,
    explanation: "  (Row)   (Column)",
    keyPoints: [""],
    tags: ["loops", "nested-loops", "pattern"],
  },
  {
    id: "prog-33",
    title: "Break and Continue Statements",
    bengaliTitle: "  (break & continue)",
    chapter: 5,
    chapterTitle: "  (Loops & Iteration)",
    difficulty: "intermediate",
    category: "Loops",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Demonstrating 'continue' (skipping 3):");
        for (int i = 1; i <= 5; i++) {
            if (i == 3) continue;
            System.out.print(i + " ");
        }
        System.out.println("\\n\\nDemonstrating 'break' (stopping at 4):");
        for (int i = 1; i <= 10; i++) {
            if (i == 4) break;
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
    expectedOutput: `Demonstrating 'continue' (skipping 3):\n1 2 4 5 \n\nDemonstrating 'break' (stopping at 4):\n1 2 3 `,
    explanation: "continue  , break",
    keyPoints: ["  break"],
    tags: ["loops", "break", "continue"],
  },
  {
    id: "prog-34",
    title: "Prime Number Checker Algorithm",
    bengaliTitle: "  (Prime Number)",
    chapter: 5,
    chapterTitle: "  (Loops & Iteration)",
    difficulty: "intermediate",
    category: "Loops",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int n = 29;
        boolean isPrime = (n > 1);
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                isPrime = false;
                break;
            }
        }
        System.out.println("Is " + n + " a Prime Number? " + isPrime);
    }
}`,
    expectedOutput: `Is 29 a Prime Number? true`,
    explanation: "i * i <= n  , O(sqrt(n))",
    keyPoints: [""],
    tags: ["math", "prime", "algorithms"],
  },
  {
    id: "prog-35",
    title: "Fibonacci Series Generation",
    bengaliTitle: "",
    chapter: 5,
    chapterTitle: "  (Loops & Iteration)",
    difficulty: "intermediate",
    category: "Loops",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int count = 10;
        int first = 0, second = 1;
        System.out.print("First " + count + " Fibonacci numbers: ");
        for (int i = 1; i <= count; i++) {
            System.out.print(first + " ");
            int next = first + second;
            first = second;
            second = next;
        }
        System.out.println();
    }
}`,
    expectedOutput: `First 10 Fibonacci numbers: 0 1 1 2 3 5 8 13 21 34 `,
    explanation: "",
    keyPoints: [""],
    tags: ["fibonacci", "series", "loops"],
  },
  // CHAPTER 6: Methods & Scope (36-42)
  {
    id: "prog-36",
    title: "Custom Method with Parameters and Return Value",
    bengaliTitle: "",
    chapter: 6,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Methods",
    description: "",
    code: `public class Main {
    public static int calculateArea(int width, int height) {
        return width * height;
    }
    public static void main(String[] args) {
        int area1 = calculateArea(10, 5);
        int area2 = calculateArea(20, 15);
        System.out.println("Rectangle 1 Area: " + area1 + " sq units");
        System.out.println("Rectangle 2 Area: " + area2 + " sq units");
    }
}`,
    expectedOutput: `Rectangle 1 Area: 50 sq units\nRectangle 2 Area: 300 sq units`,
    explanation: "",
    keyPoints: ["static"],
    tags: ["methods", "functions", "return"],
  },
  {
    id: "prog-37",
    title: "Method Overloading with Different Signatures",
    bengaliTitle: "  (Method Overloading)",
    chapter: 6,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Methods",
    description: "",
    code: `public class Main {
    public static int add(int a, int b) {
        return a + b;
    }
    public static double add(double a, double b) {
        return a + b;
    }
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
    public static void main(String[] args) {
        System.out.println("2 ints sum: " + add(10, 20));
        System.out.println("2 doubles sum: " + add(5.5, 4.2));
        System.out.println("3 ints sum: " + add(1, 2, 3));
    }
}`,
    expectedOutput: `2 ints sum: 30\n2 doubles sum: 9.7\n3 ints sum: 6`,
    explanation: "",
    keyPoints: [""],
    tags: ["methods", "overloading", "polymorphism"],
  },
  {
    id: "prog-38",
    title: "Pass by Value Concept in Java",
    bengaliTitle: "  (Pass-by-Value)",
    chapter: 6,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Methods",
    description: "",
    code: `public class Main {
    public static void modifyValue(int x) {
        x = x + 100;
        System.out.println("Inside method: x = " + x);
    }
    public static void main(String[] args) {
        int original = 25;
        System.out.println("Before call: original = " + original);
        modifyValue(original);
        System.out.println("After call:  original = " + original);
    }
}`,
    expectedOutput: `Before call: original = 25\nInside method: x = 125\nAfter call:  original = 25`,
    explanation: "",
    keyPoints: [""],
    tags: ["pass-by-value", "memory", "methods"],
  },
  {
    id: "prog-39",
    title: "Recursive Factorial Calculation",
    bengaliTitle: "  (Recursion)",
    chapter: 6,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Methods",
    description: "",
    code: `public class Main {
    public static long factorial(int n) {
        // Base case
        if (n <= 1) return 1;
        // Recursive step
        return n * factorial(n - 1);
    }
    public static void main(String[] args) {
        int target = 6;
        long result = factorial(target);
        System.out.println("Factorial of " + target + "! = " + result);
    }
}`,
    expectedOutput: `Factorial of 6! = 720`,
    explanation: "  (Base Case)   (StackOverflowError)",
    keyPoints: [""],
    tags: ["recursion", "factorial", "algorithms"],
  },
  {
    id: "prog-40",
    title: "Variable-Length Arguments (varargs)",
    bengaliTitle: "  (varargs: Type... args)",
    chapter: 6,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Methods",
    description: "",
    code: `public class Main {
    public static int sumAll(int... numbers) {
        int total = 0;
        for (int num : numbers) {
            total += num;
        }
        return total;
    }
    public static void main(String[] args) {
        System.out.println("Sum of 2 numbers: " + sumAll(10, 20));
        System.out.println("Sum of 5 numbers: " + sumAll(1, 2, 3, 4, 5));
        System.out.println("Sum of zero numbers: " + sumAll());
    }
}`,
    expectedOutput: `Sum of 2 numbers: 30\nSum of 5 numbers: 15\nSum of zero numbers: 0`,
    explanation: "varargs",
    keyPoints: ["  varargs"],
    tags: ["varargs", "methods"],
  },
  {
    id: "prog-41",
    title: "Recursive Greatest Common Divisor (GCD)",
    bengaliTitle: "",
    chapter: 6,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Methods",
    description: "  (GCD)",
    code: `public class Main {
    public static int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    public static void main(String[] args) {
        int num1 = 48, num2 = 18;
        int result = gcd(num1, num2);
        System.out.println("GCD of " + num1 + " and " + num2 + " is: " + result);
    }
}`,
    expectedOutput: `GCD of 48 and 18 is: 6`,
    explanation: "  GCD,   gcd(b, a % b)",
    keyPoints: [" : O(log(min(a, b)))"],
    tags: ["math", "recursion", "gcd"],
  },
  {
    id: "prog-42",
    title: "Variable Scope Demonstration (Local vs Shadowing)",
    bengaliTitle: "",
    chapter: 6,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Methods",
    description: "",
    code: `public class Main {
    static int globalCount = 500;
    public static void main(String[] args) {
        int globalCount = 100; // Local shadowing
        System.out.println("Local Shadowed Variable: " + globalCount);
        System.out.println("Class-level Static Variable: " + Main.globalCount);
        {
            int blockSpecific = 42;
            System.out.println("Inside Inner Block: " + blockSpecific);
        }
    }
}`,
    expectedOutput: `Local Shadowed Variable: 100\nClass-level Static Variable: 500\nInside Inner Block: 42`,
    explanation: "  Main.variable",
    keyPoints: [""],
    tags: ["scope", "variables", "shadowing"],
  },
];
