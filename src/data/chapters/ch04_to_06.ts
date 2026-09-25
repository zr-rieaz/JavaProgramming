import { Chapter } from "../../types";

export const ch04_to_06_chapters: Chapter[] = [
  {
    id: 4,
    title: "Chapter 04: Control Flow & Decision Making",
    bengaliTitle: "অধ্যায় ০৪: ডিসিশন মেকিং ও কন্ট্রোল ফ্লো",
    iconName: "GitBranch",
    summary:
      "প্রোগ্রামের বাস্তব বুদ্ধিমত্তা তৈরি হয় শর্তানুযায়ী সিদ্ধান্ত নেওয়ার ক্ষমতার মাধ্যমে। এই অধ্যায়ে আমরা if-else ল্যাডার, নেস্টেড কন্ডিশন, শর্ট-সার্কিট ইভ্যালুয়েশন এবং মডার্ন জাভার (Java 14+) অ্যারো সিনট্যাক্স ও সুইচ এক্সপ্রেশন (Switch Expression & Yield) বিস্তারিত বইয়ের মতো শিখব।",
    readingTime: "২৫ মিনিট পাঠ",
    topics: [
      {
        id: "ch4-t1",
        title: "If-Else Ladders & Short-Circuit Evaluation",
        bengaliTitle: "ইফ-এলস ল্যাডার, গার্ড ক্লজ ও শর্ট-সার্কিট মূল্যায়ন",
        summary: "বাস্তব জীবনের শর্তভিত্তিক প্রোগ্রাম পরিচালনা ও কোড অপটিমাইজেশন।",
        explanation: `বাস্তব জীবনের মতো প্রোগ্রামিংয়েও আমাদের বিভিন্ন পরিস্থিতির ওপর ভিত্তি করে ভিন্ন ভিন্ন সিদ্ধান্ত নিতে হয়। একে বলা হয় **ডিসিশন মেকিং (Decision Making)** বা কন্ট্রোল ফ্লো।

### ১. ইফ-এলস (if-else) স্ট্রাকচার কীভাবে কাজ করে?
জাভায় \`if\` ব্লক শুধুমাত্র তখনই কার্যকর হয় যখন তার ভেতরের বুলিয়ান শর্তটি \`true\` হয়। শর্তটি \`false\` হলে কম্পাইলার পরবর্তী \`else if\` বা \`else\` ব্লকে চলে যায়।

\`\`\`java
if (score >= 80) {
    grade = 'A';
} else if (score >= 70) {
    grade = 'B';
} else {
    grade = 'F';
}
\`\`\`

**গার্ড ক্লজ (Guard Clauses) দিয়ে ক্লিন কোড:**
অতিরিক্ত নেস্টেড \`if\` এর ভেতরে \`if\` লিখতে থাকলে কোডের জটিলতা বেড়ে যায় (Arrow Anti-pattern)। দক্ষ ডেভেলপাররা নেস্টেড \`if\` এড়াতে "Guard Clause" প্যাটার্ন ব্যবহার করেন—অর্থাৎ ভ্যালিডেশন ফেইল করলে প্রথমেই \`return\` করে দেওয়া।

---

### ২. শর্ট-সার্কিট ইভ্যালুয়েশনের মেমরি প্রটেকশন
লজিক্যাল \`&&\` (AND) এবং \`||\` (OR) অপারেটর শর্তগুলো বাম থেকে ডানে মূল্যায়ন করে:
- \`A && B\` তে যদি \`A\` মিথ্যা হয়, তবে পুরো রেজাল্ট অবধারিতভাবে মিথ্যা। তাই জাভা \`B\` এর অংশটি এক্সিকিউটই করে না।
- \`A || B\` তে যদি \`A\` সত্য হয়, তবে পুরো রেজাল্ট অবধারিতভাবে সত্য। তাই জাভা \`B\` এর অংশ আর যাচাই করে না।

*বাস্তব উদাহরণ:*
\`\`\`java
if (user != null && user.isActive()) {
    // এখানে user null হলে user.isActive() কল হবে না, ফলে NullPointerException ঘটবে না!
}
\`\`\``,
        codeExample: `public class Main {
    public static void main(String[] args) {
        int score = 88;
        char grade;
        
        // ১. ইফ-এলস ল্যাডার দিয়ে গ্রেড নির্ধারণ
        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else if (score >= 70) {
            grade = 'C';
        } else if (score >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }
        System.out.println("Academic Grade Result : " + grade);
        
        // ২. শর্ট-সার্কিট ইভ্যালুয়েশনের সাহায্যে নাল-পয়েন্টার প্রোটেকশন
        String clientToken = null;
        if (clientToken != null && clientToken.length() > 5) {
            System.out.println("Token Validation Success: " + clientToken);
        } else {
            System.out.println("Security Alert: Token missing or invalid (crash prevented)!");
        }
        
        // ৩. টার্নারি অপারেটর দিয়ে এক লাইনে সিদ্ধান্ত
        int customerAge = 22;
        String accessTier = (customerAge >= 18) ? "Adult Customer" : "Minor Customer";
        System.out.println("Account Category       : " + accessTier);
    }
}`,
        tips: [
          "নেস্টেড if কমানোর জন্য আগে অপ্রত্যাশিত বা ভুল ইনপুটগুলো চেক করে বের হয়ে যান (Fail Fast Principle)।",
          "স্ট্রিং তুলনা করার সময় `str == \"hello\"` না লিখে সর্বদা `\"hello\".equals(str)` লিখুন, এতে `str` নাল হলেও ক্র্যাশ করবে না।"
        ],
        commonMistakes: [
          "`if (x = 5)` লেখা। জাভায় অ্যাসাইনমেন্ট অপারেটর `=` বুলিয়ান কন্ডিশনে অনুমোদিত নয়, শর্তের জন্য অবশ্যই `==` ব্যবহার করতে হবে।",
          "`if` এর শর্তের ব্র্যাকেটের পর ভুলবশত সেমিকোলন (;) বসিয়ে দেওয়া: `if (a > b); { ... }` — এতে if স্টেটমেন্টটি সেখানেই শেষ হয়ে যায় এবং ব্লকটি সব সময় চলে।"
        ]
      },
      {
        id: "ch4-t2",
        title: "Modern Switch Expressions & Arrow Syntax",
        bengaliTitle: "মডার্ন সুইচ স্টেটমেন্ট ও এক্সপ্রেশন (Java 14+)",
        summary: "চিরাচরিত switch এর Fall-through সমস্যা এবং অ্যারো সিনট্যাক্স ও yield এর ব্যবহার।",
        explanation: `যখন একটি নির্দিষ্ট মানের ওপর ভিত্তি করে বহুবিধ ব্রাঞ্চিং করতে হয়, তখন অনেকগুলো \`else-if\` না লিখে \`switch\` ব্যবহার করা পরিচ্ছন্ন ও দ্রুততর।

### ১. সনাতন সুইচের সমস্যা: ফল-থ্রু (Fall-Through)
পুরাতন জাভায় প্রতিটি \`case\` এর শেষে \`break;\` স্টেটমেন্ট লিখতে হতো। যদি কোনো ডেভেলপার ভুলবশত \`break\` দিতে ভুলে যেত, তবে কোড নিচে গড়িয়ে পরের কেসগুলোতেও এক্সিকিউট হয়ে যেত (একে Fall-through বলে)।

### ২. আধুনিক সুইচ এক্সপ্রেশন (Enhanced Switch Expression)
জাভা ১৪ সংস্করণে অফিসিয়ালি **Switch Expression** ও **Arrow (\`->\`) সিনট্যাক্স** যুক্ত করা হয়:
- \`break\` লেখার কোনো প্রয়োজন নেই। প্রতিটি কেস সম্পূর্ণ স্বয়ংসম্পূর্ণ।
- কমা দিয়ে একাধিক মান একসাথে লেখা যায় (যেমন: \`case 1, 2, 3 ->\`)।
- সুইচ সরাসরি কোনো মান রিটার্ন করতে পারে এবং ভেরিয়েবলে অ্যাসাইন করা যায়।
- একাধিক লাইনের কোড ব্লকের ভেতরে থেকে মান রিটার্ন করতে \`yield\` কিওয়ার্ড ব্যবহৃত হয়।

### ৩. সুইচে সমর্থিত ডাটা টাইপ
জাভায় সুইচের ভেতরে \`byte\`, \`short\`, \`char\`, \`int\`, \`String\` এবং \`enum\` ব্যবহার করা যায়। তবে \`float\`, \`double\` এবং \`boolean\` ব্যবহার করা যায় না।`,
        codeExample: `public class Main {
    public static void main(String[] args) {
        int dayOfWeek = 6; // ১ = সোমবার ... ৬ = শনিবার, ৭ = রবিবার
        
        // জাভা ১৪+ সুইচ এক্সপ্রেশন (সরাসরি স্ট্রিং রিটার্ন করছে)
        String daySchedule = switch (dayOfWeek) {
            case 1, 2, 3, 4, 5 -> "Office Working Days (9:00 AM - 5:00 PM)";
            case 6, 7 -> "Weekend (Family Time & Coding Practice)";
            default -> {
                System.out.println("Warning: Invalid day input received!");
                yield "Unknown Schedule";
            }
        };
        
        System.out.println("Day Index : " + dayOfWeek);
        System.out.println("Schedule  : " + daySchedule);
    }
}`,
        tips: [
          "সুইচ এক্সপ্রেশন ব্যবহারের সময় কম্পাইলার সকল সম্ভাব্য কেস কভার করতে চায়, তাই সবসময় একটি `default` কেস রাখা নিরাপদ।",
          "String এর ওপর ভিত্তি করে সুইচ করতে জাভা ইন্টারনালি হ্যাশকোড (hash code) ও equals ব্যবহার করে, যা অত্যন্ত দ্রুত।"
        ],
        commonMistakes: [
          "সনাতন সুইচে `break` কিওয়ার্ড দিতে ভুলে যাওয়া, যার ফলে অপ্রত্যাশিত ফল-থ্রু আউটপুট আসে।",
          "সুইচ এক্সপ্রেশনকে সাধারণ স্টেটমেন্টের মতো সেমিকোলন ছাড়া রাখা; মনে রাখবেন সুইচ যখন ভেরিয়েবলে অ্যাসাইন হয়, তখন শেষের ব্র্যাকেটের পর সেমিকোলন (;) দিতে হয়।"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Chapter 05: Loops & Iterations",
    bengaliTitle: "অধ্যায় ০৫: লুপ ও ইটারেশন নিয়ন্ত্রণ",
    iconName: "RotateCw",
    summary:
      "কম্পিউটার মানুষের চেয়ে যে ক্ষেত্রে অদ্বিতীয় তা হলো একই কাজ লক্ষ কোটি বার নির্ভুলভাবে পুনরাবৃত্তি করা। এই অধ্যায়ে আমরা For loop, While loop, Do-While loop, Enhanced For-Each loop, ব্রেক ও কন্টিনিউ এবং নেস্টেড লুপের মেমরি প্রক্রিয়া শিখব।",
    readingTime: "২৬ মিনিট পাঠ",
    topics: [
      {
        id: "ch5-t1",
        title: "Core Loops: For, While & Do-While",
        bengaliTitle: "তিনটি প্রধান লুপ: For, While এবং Do-While",
        summary: "কখন কোন লুপ নির্বাচন করবেন এবং এন্ট্রি বনাম এক্সিট কন্ট্রোলড লুপের পার্থক্য।",
        explanation: `লুপ হলো একটি কোড ব্লককে নির্দিষ্ট শর্ত পূরণ না হওয়া পর্যন্ত বারবার চালানোর কাঠামো।

### ১. ফর লুপ (For Loop) - সংখ্যা জানা থাকলে
যখন আগে থেকেই জানা থাকে যে কোডটি ঠিক কতবার চলবে, তখন \`for\` লুপ সবচেয়ে আদর্শ।
\`\`\`java
for (initialization; condition; update) {
    // লুপ বডি
}
\`\`\`
- **ধাপ ১:** শুরুর প্রারম্ভিক মান নির্ধারণ (Initialization - শুধু একবার চলে)।
- **ধাপ ২:** শর্ত পরীক্ষা (Condition - প্রতি রাউন্ডের শুরুতে চলে)।
- **ধাপ ৩:** বডি এক্সিকিউশন (যদি শর্ত সত্য হয়)।
- **ধাপ ৪:** মান বৃদ্ধি বা হ্রাস (Update - প্রতি রাউন্ডের শেষে চলে)।

---

### ২. হোয়াইল লুপ (While Loop) - শর্তাধীন পুনরাবৃত্তি
যখন আগে থেকে জানা থাকে না কতবার ঘুরতে হবে, কিন্তু একটি শর্তের ওপর নির্ভর করে লুপটি চলবে (যেমন ডাটাবেজ থেকে ডাটা পড়া বা ব্যবহারকারী নির্দিষ্ট বাটন না টেপা পর্যন্ত)। এটি **Entry-controlled Loop**, অর্থাৎ শুরুতেই শর্ত ভুল হলে একবারও চলে না।

---

### ৩. ডু-হোয়াইল লুপ (Do-While Loop) - অন্তত একবার চালানোর নিশ্চয়তা
এটি **Exit-controlled Loop**। এখানে শর্তটি লুপের বডি চলার পর নিচে পরীক্ষা করা হয়। তাই শর্ত শুরু থেকেই মিথ্যা হলেও লুপের কোড অন্ততপক্ষে একবার চলবেই। ব্যবহারকারীর মেন্যু নির্বাচন বা গেম রিস্টার্ট প্রম্পটে এটি উপযুক্ত।`,
        codeExample: `public class Main {
    public static void main(String[] args) {
        // ১. নির্দিষ্ট রেঞ্জে ফর লুপ (১ থেকে ৫ পর্যন্ত যোগফল)
        System.out.println("--- 1. For Loop (Definite Counter) ---");
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += i;
            System.out.println("Iteration " + i + " -> Running Sum: " + sum);
        }
        
        // ২. হোয়াইল লুপ (কাউন্টডাউন)
        System.out.println("\\n--- 2. While Loop (Conditional Loop) ---");
        int countdown = 3;
        while (countdown > 0) {
            System.out.println("Rocket launch countdown: " + countdown + " seconds");
            countdown--;
        }
        
        // ৩. ডু-হোয়াইল লুপ (শর্ত মিথ্যা হলেও অন্তত একবার চলবে)
        System.out.println("\\n--- 3. Do-While Loop (Guaranteed Once) ---");
        int testCondition = 999;
        do {
            System.out.println("Condition false (testCondition < 10), but do-while ran once successfully!");
        } while (testCondition < 10);
    }
}`,
        tips: [
          "লুপের ভেতর কখনো শর্তের ভেরিয়েবল আপডেট করতে ভুলবেন না, অন্যথায় ইনফিনিট লুপ (Infinite Loop) তৈরি হয়ে প্রোগ্রাম আটকে যাবে।",
          "লুপ কাউন্টার ভেরিয়েবলকে সর্বদা লুপের ভেতরে ডিক্লেয়ার করুন (`for (int i = 0...)`), যাতে মেমরিতে তার স্কোপ সীমিত থাকে।"
        ],
        commonMistakes: [
          "অফ-বাই-ওয়ান এরর (Off-by-one Error): `<=` এর জায়গায় `<` বা `<=` গুলিয়ে ফেলে ১টি চক্র কম বা বেশি চালানো।",
          "ডু-হোয়াইল লুপের শেষের `while (condition);` লাইনে সেমিকোলন না দেওয়া।"
        ]
      },
      {
        id: "ch5-t2",
        title: "Loop Flow Control: Break, Continue & Labels",
        bengaliTitle: "লুপ প্রবাহ নিয়ন্ত্রণ: Break, Continue ও Labeled Jumps",
        summary: "চক্রের মাঝপথে থামিয়ে দেওয়া বা নির্দিষ্ট রাউন্ড স্কিপ করার পদ্ধতি।",
        explanation: `লুপ চলাকালীন বিশেষ পরিস্থিতিতে পুরো লুপ বন্ধ করতে বা নির্দিষ্ট একটি ধাপ এড়িয়ে যেতে জাভায় দুটি জাম্পিং স্টেটমেন্ট রয়েছে:

### ১. ব্রেক (break) স্টেটমেন্ট
লুপ চলার সময় যখনই \`break\` স্টেটমেন্ট পাওয়া যায়, পুরো লুপ তৎক্ষণাৎ বন্ধ হয়ে যায় এবং লুপের বাইরে থাকা পরবর্তী লাইনে চলে যায়। যেমন সার্চিং অ্যালগরিদমে কাঙ্ক্ষিত আইটেমটি খুঁজে পাওয়ার পর বাকি আইটেমগুলো আর খোঁজার দরকার নেই।

### ২. কন্টিনিউ (continue) স্টেটমেন্ট
\`continue\` লুপকে পুরোপুরি বন্ধ করে না, বরং বর্তমান ইটারেশনের বাকি কোড স্কিপ করে সরাসরি পরবর্তী ইটারেশনে চলে যায়। যেমন শুধুমাত্র বিজোড় সংখ্যা প্রিন্ট করতে জোড় সংখ্যা এড়িয়ে যাওয়া।

### ৩. লেবেলড ব্রেক ও কন্টিনিউ (Labeled Loops)
নেস্টেড লুপে সাধারণ \`break\` শুধুমাত্র সবচেয়ে ভেতরের লুপ থেকে বের করে দেয়। কিন্তু আপনি যদি একেবারে বাইরের প্যারেন্ট লুপ থেকেও একবারে বের হয়ে যেতে চান, তবে লুপের নামের আগে একটি লেবেল (যেমন: \`outer:\`) দিয়ে \`break outer;\` লিখতে হয়।`,
        codeExample: `public class Main {
    public static void main(String[] args) {
        // ১. Continue দিয়ে জোড় সংখ্যা ফিল্টারিং
        System.out.println("--- Continue Demo (Odd numbers from 1 to 6) ---");
        for (int i = 1; i <= 6; i++) {
            if (i % 2 == 0) {
                continue; // জোড় সংখ্যা হলে নিচের লাইন এড়িয়ে পরবর্তী চক্রে যাবে
            }
            System.out.println("Odd number found: " + i);
        }
        
        // ২. Labeled Break দিয়ে বহুমাত্রিক নেস্টেড গ্রিড সার্চ
        System.out.println("\\n--- Labeled Break Demo (Searching target in matrix) ---");
        int target = 25;
        boolean found = false;
        
        outerLoop: // বাইরের লুপের লেবেল
        for (int row = 1; row <= 5; row++) {
            for (int col = 1; col <= 5; col++) {
                int product = row * col;
                if (product == target) {
                    System.out.println("Target " + target + " found at row " + row + " and col " + col + "!");
                    found = true;
                    break outerLoop; // সরাসরি উভয় লুপ থেকে একবারে বের হয়ে আসবে
                }
            }
        }
        
        if (!found) {
            System.out.println("Target not found in matrix.");
        }
    }
}`,
        tips: [
          "লুপের বডিতে যেখানেই ব্রেক কল করবেন, তার ঠিক পরেই কোনো আনরিচেবল কোড (Unreachable code) রাখবেন না।",
          "নেস্টেড লুপের গভীরতা ৩ স্তরের বেশি রাখা উচিত নয়, কারণ এতে টাইম কমপ্লেক্সিটি $O(n^3)$ হয়ে সফটওয়্যার ধীরগতির হয়ে পড়ে।"
        ],
        commonMistakes: [
          "while লুপে continue ব্যবহারের আগে কাউন্টার ভেরিয়েবল বৃদ্ধি না করা; এতে ইনফিনিট লুপ তৈরি হয়ে যায় কারণ কাউন্টার একই মানে আটকে থাকে।",
          "switch এর ভেতরের break আর লুপের ভেতরের break গুলিয়ে ফেলা।"
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Chapter 06: Methods & Recursion",
    bengaliTitle: "অধ্যায় ০৬: মেথড ও রিকার্শন মাস্টারক্লাস",
    iconName: "Binary",
    summary:
      "মেথড হলো কোড পুনর্ব্যবহারযোগ্যতা ও মডুলার আর্কিটেকচারের ভিত্তি। এই অধ্যায়ে আমরা মেথডের গঠন, প্যারামিটার পাসিং প্রক্রিয়া (Pass-by-value), মেথড ওভারলোডিং, ভ্যারআর্গস (varargs) এবং রিকার্শনের বেস কেস ও কল স্ট্যাক ফ্রেম বিস্তারিত শিখব।",
    readingTime: "২৭ মিনিট পাঠ",
    topics: [
      {
        id: "ch6-t1",
        title: "Method Anatomy, Pass-by-Value & Overloading",
        bengaliTitle: "মেথডের গঠন, পাস-বাই-ভ্যালু নীতি ও মেথড ওভারলোডিং",
        summary: "জাভায় মেমরি কীভাবে প্যারামিটার হ্যান্ডেল করে এবং একই নামের একাধিক মেথডের নিয়ম।",
        explanation: `মেথড হলো স্টেটমেন্টের একটি ব্লক যা কোনো নির্দিষ্ট কাজ সম্পন্ন করে এবং প্রয়োজন অনুসারে ফলাফল রিটার্ন করে।

### ১. মেথড সিগনেচার (Method Signature)
একটি মেথডের সিগনেচার গঠিত হয়:
- মেথডের নাম
- প্যারামিটারের সংখ্যা, প্রকারভেদ (Types) এবং ক্রমবিন্যাস দ্বারা।
*লক্ষ্যণীয়:* মেথডের রিটার্ন টাইপ কখনোই সিগনেচারের অংশ নয়।

---

### ২. জাভার পরম সত্য: "Java is ALWAYS Pass-by-Value"
প্রোগ্রামিং বিশ্বে একটি বহুল বিতর্কিত বিষয় হলো জাভায় মান কীভাবে পাস হয়। নিয়মটি হলো:
**জাভায় সব কিছু সব সময় Pass-by-Value হয়।**
- যখন আপনি কোনো **প্রিমিটিভ টাইপ** (\`int\`, \`double\` ইত্যাদি) পাস করেন, তখন মূল মানের একটি অবিকল কপি পাস হয়। মেথডের ভেতরে সেই কপিতে পরিবর্তন করলে বাইরের মূল ভেরিয়েবলে কোনো প্রভাব পড়ে না।
- যখন আপনি কোনো **অবজেক্ট বা অ্যারে** পাস করেন, অনেকে ভাবেন এটি Pass-by-Reference। কিন্তু আসলে অবজেক্ট রেফারেন্সের অ্যাড্রেসের একটি *কপি* পাস হয়! তাই আপনি যদি মেথডের ভেতর ওই ঠিকানায় গিয়ে অবজেক্টের ভেতরের ফিল্ড বদলান, তবে তা পরিবর্তন হবে; কিন্তু নতুন অবজেক্ট অ্যাসাইন করলে মূল রেফারেন্সে কোনো প্রভাব পড়ে না।

---

### ৩. মেথড ওভারলোডিং (Method Overloading)
একই ক্লাসের ভেতরে একই নামের একাধিক মেথড তৈরি করার ক্ষমতাকে মেথড ওভারলোডিং বলে। শর্ত হলো তাদের প্যারামিটার তালিকা অবশ্যই ভিন্ন হতে হবে (প্যারামিটার সংখ্যা, টাইপ বা সিকোয়েন্স আলাদা হতে হবে)। এটি কম্পাইল-টাইম পলিমরফিজমের উদাহরণ।`,
        codeExample: `public class Main {
    // মেথড ওভারলোডিং ১: দুটি পূর্ণসংখ্যা যোগ
    public static int add(int a, int b) {
        return a + b;
    }
    
    // মেথড ওভারলোডিং ২: তিনটি পূর্ণসংখ্যা যোগ
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
    
    // মেথড ওভারলোডিং ৩: দুটি দশমিক সংখ্যা যোগ
    public static double add(double a, double b) {
        return a + b;
    }
    
    // পাস-বাই-ভ্যালু প্রমাণকারী মেথড
    public static void modifyValue(int number) {
        number = 999; // শুধুমাত্র স্থানীয় কপিতে পরিবর্তন
    }

    public static void main(String[] args) {
        // মেথড ওভারলোডিং এর প্রমাণ
        System.out.println("Sum of 2 ints     : " + add(10, 20));
        System.out.println("Sum of 3 ints     : " + add(10, 20, 30));
        System.out.println("Sum of 2 doubles  : " + add(5.5, 4.5));
        
        // পাস-বাই-ভ্যালুর অকাট্য প্রমাণ
        int originalNumber = 50;
        modifyValue(originalNumber);
        System.out.println("Original value after passing: " + originalNumber + " (Unchanged!)");
    }
}`,
        tips: [
          "মেথডের নাম সব সময় ক্রিয়াপদ (Verb) দিয়ে শুরু করা এবং camelCase অনুসরণ করা উচিত (যেমন: `calculateSalary`, `fetchUserData`)।",
          "রিটার্ন টাইপ পরিবর্তন করে মেথড ওভারলোড করা যায় না; প্যারামিটার তালিকা পরিবর্তন করতেই হবে।"
        ],
        commonMistakes: [
          "ভুল ধারণা রাখা যে প্রিমিটিভ রেফারেন্স দিয়ে পাস হয়।",
          "মেথডের প্যারামিটার সংখ্যার অনিশ্চয়তা থাকলে ওভারলোডিং না করে Varargs (`int... numbers`) ব্যবহার করা বুদ্ধিমানের কাজ।"
        ]
      },
      {
        id: "ch6-t2",
        title: "Recursion Mechanics & StackOverflow Prevention",
        bengaliTitle: "রিকার্শন পদ্ধতি, বেস কেস ও স্ট্যাক-ওভারফ্লো প্রতিরোধ",
        summary: "একটি মেথড যখন নিজেকেই পুনরায় কল করে এবং মেমরি স্ট্যাক ফ্রেম ব্যবস্থাপনা।",
        explanation: `যখন কোনো মেথড তার সমস্যা সমাধানের উদ্দেশ্যে নিজেকেই সরাসরি বা পরোক্ষভাবে পুনরায় কল করে, তখন তাকে **রিকার্শন (Recursion)** বলে।

### ১. রিকার্শনের মূল দুটি উপাদান
যেকোনো সফল রিকার্সিভ মেথডে অবশ্যই দুটি জিনিস থাকতে হবে:
1. **বেস কেস (Base Case):** যে শর্তে পৌঁছে রিকার্শন থেমে যাবে। এটি ছাড়া রিকার্শন অনন্তকাল চলতে থাকবে।
2. **রিকার্সিভ স্টেপ (Recursive Step):** মূল সমস্যাটিকে ক্ষুদ্রতর উপ-সমস্যায় বিভক্ত করে পুনরায় নিজেকে কল করা, যা ধাপে ধাপে বেস কেসের দিকে এগিয়ে যায়।

---

### ২. কল স্ট্যাক ও স্ট্যাক ওভারফ্লো এরর (StackOverflowError)
প্রতিবার যখন কোনো মেথড কল হয়, জেভিএম এর স্ট্যাক মেমরিতে একটি নতুন **স্ট্যাক ফ্রেম (Stack Frame)** তৈরি হয়।
যদি কোনো রিকার্শনের বেস কেস না থাকে বা ভুল শর্তের কারণে থামতে না পারে, তবে স্ট্যাক মেমরিতে হাজার হাজার ফ্রেম জমা হতে থাকে। এক পর্যায়ে স্ট্যাকের জন্য বরাদ্দকৃত র‍্যাম ফুরিয়ে যায় এবং জেভিএম ক্র্যাশ করে বিখ্যাত **\`java.lang.StackOverflowError\`** ছুড়ে দেয়।

---

### ৩. রিকার্শন বনাম ইটারেশন
- রিকার্শন কোডকে গাণিতিকভাবে খুব সুন্দর ও সংক্ষিপ্ত করে তোলে (যেমন ট্রি ট্রাভার্সাল, গ্রাফ, টাওয়ার অব হ্যানয়, ব্যাকট্র্যাকিং)।
- তবে সাধারণ গণনার ক্ষেত্রে রিকার্শনের মেমরি ওভারহেড বেশি, তাই লুপ চালানো অধিক স্মৃতি-সাশ্রয়ী।`,
        codeExample: `public class Main {
    // ফ্যাক্টোরিয়াল নির্ণয়ে রিকার্শন
    public static long factorial(int n) {
        // ১. বেস কেস: n যখন ০ বা ১, তখন ফ্যাক্টোরিয়াল ১
        if (n <= 1) {
            return 1;
        }
        // ২. রিকার্সিভ স্টেপ: n * factorial(n - 1)
        return n * factorial(n - 1);
    }
    
    // ফিবোনাচ্চি সংখ্যার রিকার্সিভ হিসাব
    public static int fibonacci(int n) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        int number = 5;
        long factResult = factorial(number);
        System.out.println("Factorial of " + number + " (5!) = " + factResult);
        
        System.out.print("First 8 Fibonacci terms: ");
        for (int i = 0; i < 8; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();
    }
}`,
        tips: [
          "রিকার্সিভ কোড লেখার সময় প্রথম লাইনটিই লিখুন বেস কেস যাচাই করার জন্য।",
          "বড় সংখ্যার জন্য ফিবোনাচ্চি বের করতে সাধারণ রিকার্শন ব্যবহার করবেন না, কারণ এর টাইম কমপ্লেক্সিটি $O(2^n)$; সেক্ষেত্রে মেমোইজেশন (DP) বা লুপ ব্যবহার করুন।"
        ],
        commonMistakes: [
          "বেস কেস না দেওয়া বা বেস কেস পর্যন্ত কখনোই না পৌঁছানো, যার ফলে `StackOverflowError` ঘটে।",
          "রিকার্শনে নেগেটিভ ইনপুট হ্যান্ডেল না করা, যার ফলে অসীম লুপে চলে যাওয়া।"
        ]
      }
    ]
  }
];
