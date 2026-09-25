import { Chapter } from "../../types";

export const ch07_to_09_chapters: Chapter[] = [
  {
    id: 7,
    title: "Chapter 07: Arrays & Multidimensional Matrices",
    bengaliTitle: "অধ্যায় ০৭: অ্যারে ও বহুমাত্রিক ম্যাট্রিক্স প্রসেসিং",
    iconName: "Layers",
    summary:
      "মেমরিতে সমজাতীয় ডাটাকে সারিবদ্ধভাবে সাজিয়ে দ্রুত ইনডেক্সিং করার অন্যতম শক্তিশালী কাঠামো হলো অ্যারে। এই অধ্যায়ে আমরা ১-মাত্রিক ও ২-মাত্রিক অ্যারে, মেমরি লেআউট (Contiguous Allocation), ArrayIndexOutOfBoundsException প্রতিরোধ, ম্যাট্রিক্স অপারেশন এবং Jagged Arrays বিস্তারিত বইয়ের মতো শিখব।",
    readingTime: "২৬ মিনিট পাঠ",
    topics: [
      {
        id: "ch7-t1",
        title: "Array Memory Representation & Bounds Safety",
        bengaliTitle: "অ্যারে মেমরি কাঠামো, ইনডেক্সিং ও বাউন্ডস সেফটি",
        summary: "হিপ মেমরিতে অ্যারের বরাদ্দ, জিরো-বেসড ইনডেক্সিং ও বাউন্ড সেফটি মেকানিজম।",
        explanation: `অ্যারে (Array) হলো একই ডাটা টাইপের উপাদানসমূহের একটি নির্দিষ্ট দৈর্ঘ্যের সংগ্রহ, যা মেমরিতে পরস্পর সংলগ্ন (Contiguous Memory Locations) অবস্থানে সংরক্ষিত হয়।

### ১. স্ট্যাক বনাম হিপে অ্যারের মেমরি রূপায়ন
জাভায় সকল অ্যারে হলো **অবজেক্ট**। যখন আমরা লিখি:
\`\`\`java
int[] numbers = new int[5];
\`\`\`
তখন মেমরিতে দুটি ভিন্ন ঘটনা ঘটে:
1. **স্ট্যাক মেমরিতে:** \`numbers\` নামের একটি রেফারেন্স ভেরিয়েবল তৈরি হয় (যা কেবল হিপের অ্যাড্রেস ধারণ করে)।
2. **হিপ মেমরিতে:** টানা ৫টি ইন্টিজারের (প্রতিটি ৪ বাইট করে মোট ২০ বাইট) মেমরি ব্লক বরাদ্দ হয় এবং তাদের প্রত্যেকটিকে ডিফল্ট মান \`0\` দিয়ে পূর্ণ করা হয়।

---

### ২. জিরো-বেসড ইনডেক্সিং ও বাউন্ডস সেফটি
জাভার অ্যারের ইনডেক্স সর্বদা \`0\` থেকে শুরু হয়ে \`length - 1\` পর্যন্ত চলে।
- প্রথম উপাদান: \`numbers[0]\`
- শেষ উপাদান: \`numbers[numbers.length - 1]\`

**বাউন্ডস চেকিং (Bounds Checking):**
সি বা সি++ এ সীমার বাইরের ইনডেক্সে অ্যাক্সেস করলে মেমরি করাপশন হয় (Buffer Overflow Vulnerability)। কিন্তু জাভা অত্যন্ত সুরক্ষিত। আপনি যদি অ্যারের সীমার বাইরে (যেমন ঋণাত্মক ইনডেক্স বা \`length\` এর সমান বা বড় ইনডেক্সে) অ্যাক্সেস করার চেষ্টা করেন, তবে জেভিএম তৎক্ষণাৎ কোড আটকে বিখ্যাত **\`ArrayIndexOutOfBoundsException\`** ছুড়ে দেয়।

---

### ৩. অ্যারের সীমাবদ্ধতা
অ্যারে তৈরির সময় তার সাইজ নির্দিষ্ট করে দিতে হয় এবং পরবর্তীতে তা বাড়ানো বা কমানো যায় না। ডাইনামিক সাইজের প্রয়োজন হলে জাভার \`ArrayList\` বা কালেকশনস ব্যবহার করা হয়।`,
        codeExample: `public class Main {
    public static void main(String[] args) {
        // ১. অ্যারে ডিক্লেয়ার ও ইনিশিয়ালাইজ
        int[] scores = {85, 92, 78, 96, 89};
        
        System.out.println("--- Array Basic Operations ---");
        System.out.println("Total Array Length        : " + scores.length);
        System.out.println("First Element (Index 0)   : " + scores[0]);
        System.out.println("Last Element (Index 4)    : " + scores[scores.length - 1]);
        
        // ২. ট্রাভার্সাল এবং পরিসংখ্যান হিসাব
        int totalSum = 0;
        int maxScore = scores[0];
        int minScore = scores[0];
        
        // এনহ্যান্সড ফর-ইচ লুপ (Enhanced For-Each Loop)
        for (int score : scores) {
            totalSum += score;
            if (score > maxScore) maxScore = score;
            if (score < minScore) minScore = score;
        }
        
        double averageScore = (double) totalSum / scores.length;
        
        System.out.println("Total Sum of All Scores   : " + totalSum);
        System.out.println("Maximum Score             : " + maxScore);
        System.out.println("Minimum Score             : " + minScore);
        System.out.printf("Average Score             : %.2f %n", averageScore);
    }
}`,
        tips: [
          "অ্যারের সাইজ জানার জন্য `arr.length` ব্যবহার করা হয় (কোনো ব্র্যাকেট ছাড়া)। অন্যদিকে স্ট্রিংয়ের জন্য `str.length()` মেথড ব্যবহার করা হয়।",
          "শুধুমাত্র ডাটা রিড করতে ট্র্যাডিশনাল লুপের চেয়ে Enhanced For-Each (`for (int val : arr)`) লুপ ব্যবহার করা পরিষ্কার ও অফ-বাই-ওয়ান এররমুক্ত।"
        ],
        commonMistakes: [
          "লুপে `i <= arr.length` লেখা। এটি সব সময় `ArrayIndexOutOfBoundsException` তৈরি করে। সর্বদা `i < arr.length` লিখতে হবে।",
          "অ্যারে ডিক্লেয়ার করেই মান বসানোর চেষ্টা করা: `int[] a; a[0] = 5;` — এটি কম্পাইল এরর দেবে কারণ মেমরিতে `new` দিয়ে জায়গা বরাদ্দ করা হয়নি।"
        ]
      },
      {
        id: "ch7-t2",
        title: "2D Arrays, Matrices & Jagged Arrays",
        bengaliTitle: "দ্বিমাত্রিক অ্যারে, ম্যাট্রিক্স ও জ্যাগড অ্যারে",
        summary: "ম্যাট্রিক্স অ্যালগরিদম, রো-কলাম ইন্টারনালস এবং অসম দৈর্ঘ্যের জ্যাগড অ্যারে।",
        explanation: `বাস্তব জীবনের টেবিল, চেসবোর্ড, স্প্রেডশীট বা ইমেজ পিক্সেলে কাজ করতে বহুমাত্রিক অ্যারে ব্যবহৃত হয়।

### ১. ২-ডি অ্যারে আসলে কী? "অ্যারের ভেতরে অ্যারে"
জাভায় বহুমাত্রিক অ্যারে অন্যান্য ভাষার মতো একক মেমরি ব্লকে থাকে না। জাভায় ২-ডি অ্যারে হলো **"An Array of Arrays"** (অ্যারের একটি প্রধান অ্যারে, যার প্রতিটি উপাদান অন্য একটি অ্যারের রেফারেন্স ধারণ করে)।

\`\`\`java
int[][] matrix = new int[3][3];
\`\`\`
এখানে \`matrix\` রেফার করে ৩টি উপাদানের একটি অ্যারেকে, এবং ওই ৩টির প্রতিটি রেফার করে আরও ৩টি ইন্টিজার ধারণকারী পৃথক অ্যারেকে।
- রো সংখ্যা: \`matrix.length\`
- কোনো নির্দিষ্ট রো এর কলাম সংখ্যা: \`matrix[i].length\`

---

### ২. জ্যাগড অ্যারে (Jagged / Ragged Arrays)
যেহেতু প্রতিটি রো একটি স্বতন্ত্র অ্যারে অবজেক্ট, তাই প্রতিটি রো-এর দৈর্ঘ্য সমান হতে হবে এমন কোনো বাধ্যবাধকতা জাভায় নেই! একে বলা হয় **জ্যাগড অ্যারে**:
\`\`\`java
int[][] jagged = new int[3][];
jagged[0] = new int[2]; // ১ম রো তে ২টি কলাম
jagged[1] = new int[4]; // ২য় রো তে ৪টি কলাম
jagged[2] = new int[1]; // ৩য় রো তে ১টি কলাম
\`\`\`
এতে মেমরির বিপুল অপচয় রোধ হয় (যেমন কোনো ক্লাসে প্রতি সেকশনে শিক্ষার্থীর সংখ্যা ভিন্ন হলে)।`,
        codeExample: `public class Main {
    public static void main(String[] args) {
        // ৩x৩ ম্যাট্রিক্স ইনিশিয়ালাইজেশন
        int[][] matrix = {
            {5, 8, 3},
            {2, 9, 6},
            {4, 1, 7}
        };
        
        System.out.println("--- 3x3 Grid Table Printing ---");
        for (int row = 0; row < matrix.length; row++) {
            for (int col = 0; col < matrix[row].length; col++) {
                System.out.print(matrix[row][col] + "\\t");
            }
            System.out.println();
        }
        
        // প্রধান কর্ণ (Main Diagonal / Trace) এর যোগফল নির্ণয়
        int diagonalSum = 0;
        for (int i = 0; i < matrix.length; i++) {
            diagonalSum += matrix[i][i]; // যেখানে row == col
        }
        System.out.println("\\nMatrix Analysis:");
        System.out.println("Total Rows             : " + matrix.length);
        System.out.println("Total Columns          : " + matrix[0].length);
        System.out.println("Main Diagonal Sum      : " + diagonalSum);
    }
}`,
        tips: [
          "নেস্টেড লুপে কলামের সীমা দিতে সর্বদা `col < matrix[row].length` ব্যবহার করুন, যাতে জ্যাগড অ্যারেতেও ক্র্যাশ না করে।",
          "টেবুলার আউটপুট সুন্দরভাবে অ্যালাইন করতে স্পেসের বদলে `\\t` (Tab) ব্যবহার করুন।"
        ],
        commonMistakes: [
          "সকল রো-এর কলাম সংখ্যা একই ধরে নিয়ে সবসময় `matrix[0].length` ব্যবহার করা। জ্যাগড অ্যারে হলে তা ক্র্যাশ করবে।",
          "রো এবং কলামের ইনডেক্স উল্টে ফেলা (যেমন `matrix[col][row]`), যার ফলে ম্যাট্রিক্স ট্রান্সপোজ হয়ে যেতে পারে।"
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Chapter 08: Strings & Text Processing",
    bengaliTitle: "অধ্যায় ০৮: স্ট্রিং ও টেক্সট প্রসেসিং মেকানিক্স",
    iconName: "Sliders",
    summary:
      "জাভায় টেক্সট পরিচালনার জন্য স্ট্রিং সবচেয়ে বেশি ব্যবহৃত ক্লাস। এই অধ্যায়ে আমরা স্ট্রিংয়ের অপরিবর্তনীয়তা (Immutability), স্ট্রিং কনস্ট্যান্ট পুল (SCP), '==' বনাম equals(), StringBuilder ও StringBuffer এর পারফরম্যান্স পার্থক্য বিস্তারিতভাবে শিখব।",
    readingTime: "২৭ মিনিট পাঠ",
    topics: [
      {
        id: "ch8-t1",
        title: "String Immutability & String Constant Pool (SCP)",
        bengaliTitle: "স্ট্রিং ইমিউটেবিলিটি ও স্ট্রিং কনস্ট্যান্ট পুল (SCP)",
        summary: "কেন জাভায় স্ট্রিং অপরিবর্তনীয় এবং মেমরি কীভাবে সাশ্রয় হয়।",
        explanation: `জাভায় স্ট্রিং কোনো প্রিমিটিভ টাইপ নয়, এটি \`java.lang.String\` ক্লাসের অবজেক্ট।

### ১. স্ট্রিং ইমিউটেবিলিটি (Immutability) কী?
জাভায় একবার কোনো স্ট্রিং তৈরি করা হলে তার মান কখনোই মেমরিতে সরাসরি পরিবর্তন করা যায় না। একে **ইমিউটেবিলিটি (Immutability)** বলে।
\`\`\`java
String s = "Java";
s.concat(" Pro");
System.out.println(s); // প্রিন্ট হবে "Java" (Java Pro নয়!)
\`\`\`
এখানে \`concat\` মেথডটি মেমরিতে নতুন একটি স্ট্রিং অবজেক্ট \`"Java Pro"\` তৈরি করেছে, কিন্তু মূল \`s\` ভেরিয়েবলকে পরিবর্তন করেনি।

---

### ২. স্ট্রিং কনস্ট্যান্ট পুল (String Constant Pool - SCP)
মেমরি সাশ্রয় করার জন্য জেভিএম হিপের মধ্যে একটি বিশেষ স্থান রাখে যার নাম **String Constant Pool (SCP)**।
- যখন আপনি ডাবল কোটেশন দিয়ে স্ট্রিং লিখবেন (\`String s1 = "Hello";\`), জেভিএম আগে পুলে চেক করে দেখে এই টেক্সট ইতিমধ্যে আছে কিনা। থাকলে নতুন অবজেক্ট না বানিয়ে সেই একই রেফারেন্স শেয়ার করে।
- যখন আপনি \`new\` কিওয়ার্ড দিয়ে স্ট্রিং লিখবেন (\`String s2 = new String("Hello");\`), তখন বাধ্যতামূলকভাবে পুলে একটি এবং সাধারণ হিপে আরেকটি নতুন অবজেক্ট তৈরি হয়।

---

### ৩. '==' বনাম .equals() এর মারাত্মক পার্থক্য
- \`==\` অপারেটর: দুটি ভেরিয়েবল মেমরির **একই অ্যাড্রেসে রেফার করছে কিনা** তা চেক করে (Reference Equality)।
- \`.equals()\` মেথড: মেমরির ঠিকানা যাই হোক না কেন, তাদের ভেতরের **টেক্সট হুবহু এক কিনা** তা চেক করে (Content Equality)।
অতএব, স্ট্রিংয়ের কন্টেন্ট যাচাইয়ে সব সময় \`.equals()\` ব্যবহার করা বাধ্যতামূলক!`,
        codeExample: `public class Main {
    public static void main(String[] args) {
        // ১. স্ট্রিং পুল (SCP) বনাম হিপ অবজেক্ট
        String str1 = "Hello";
        String str2 = "Hello";
        String str3 = new String("Hello");
        
        System.out.println("--- String Comparison & Memory Test ---");
        // str1 এবং str2 উভয়ই SCP-র একই অবজেক্ট নির্দেশ করে
        System.out.println("str1 == str2 (Same in pool)       : " + (str1 == str2));
        
        // str3 নতুন হিপ অবজেক্ট হওয়ায় ঠিকানা ভিন্ন
        System.out.println("str1 == str3 (Different address)  : " + (str1 == str3));
        
        // কন্টেন্ট উভয় ক্ষেত্রেই এক, তাই equals সত্য দেবে
        System.out.println("str1.equals(str3) (Content match) : " + str1.equals(str3));
        
        // ২. সাধারণ স্ট্রিং অপারেশনসমূহ
        String message = "  Java Master Lab 2024  ";
        System.out.println("\\nOriginal Text     : '" + message + "'");
        System.out.println("Trimmed Text      : '" + message.trim() + "'");
        System.out.println("Uppercase         : " + message.trim().toUpperCase());
        System.out.println("Text Length       : " + message.trim().length());
        System.out.println("Substring (0-4)   : " + message.trim().substring(0, 4));
    }
}`,
        tips: [
          "লুপের ভেতর স্ট্রিং যোগ করতে (`+`) ব্যবহার করবেন না, কারণ এতে প্রতি চক্রে নতুন নতুন অবজেক্ট তৈরি হয়ে মেমরি পূর্ণ হয়ে যায়।",
          "কেস উপেক্ষা করে তুলনা করতে `str1.equalsIgnoreCase(str2)` মেথড ব্যবহার করুন।"
        ],
        commonMistakes: [
          "স্ট্রিং মেলাতে `==` ব্যবহার করা। এতে অনেক সময় ভিন্ন অবজেক্টের কারণে ভুল ফলাফল বা লজিক্যাল বাগ তৈরি হয়।",
          "স্ট্রিং মেথড কল করার পর ফলাফল কোনো ভেরিয়েবলে অ্যাসাইন না করে ভাবা যে মূল স্ট্রিং বদলে গেছে।"
        ]
      },
      {
        id: "ch8-t2",
        title: "StringBuilder vs StringBuffer Performance",
        bengaliTitle: "মিউটেবল স্ট্রিং: StringBuilder বনাম StringBuffer",
        summary: "অগণিত টেক্সট কনক্যাটেনেশনে সুপার ফাস্ট পারফরম্যান্স ও থ্রেড সেফটি।",
        explanation: `যেহেতু সাধারণ \`String\` ইমিউটেবল, তাই বারবার টেক্সট যোগ বা পরিবর্তন করতে জাভা দুটি মিউটেবল (পরিবর্তনযোগ্য) ক্লাস সরবরাহ করে:
1. **\`StringBuilder\`**
2. **\`StringBuffer\`**

### ১. কীভাবে এরা মেমরি বাঁচায়?
\`StringBuilder\` মেমরিতে একটি এক্সপ্যান্ডেবল ক্যারেক্টার বাফার রাখে। যখন আপনি \`append()\` কল করেন, কোনো নতুন অবজেক্ট তৈরি হয় না, বরং সেই বিদ্যমান মেমরি বাফারে টেক্সট যুক্ত হয়। ফলে পারফরম্যান্স শতগুণ বৃদ্ধি পায়।

### ২. StringBuilder বনাম StringBuffer এর তুলনা
- **\`StringBuilder\` (অ-সিঙ্ক্রোনাইজড / Fast):** এটি থ্রেড-সেফ নয়, তবে অত্যন্ত দ্রুতগতির। সিঙ্গেল থ্রেডে বা সাধারণ কোডিংয়ে টেক্সট জোড়া লাগাতে এটিই আধুনিক স্ট্যান্ডার্ড।
- **\`StringBuffer\` (সিঙ্ক্রোনাইজড / Thread-Safe):** এর মেথডগুলো সিঙ্ক্রোনাইজড, অর্থাৎ একাধিক থ্রেড একই সাথে নিরাপদভাবে কাজ করতে পারে। তবে অতিরিক্ত লকিংয়ের কারণে এটি ধীরগতির।`,
        codeExample: `public class Main {
    public static void main(String[] args) {
        // StringBuilder এর সাহায্যে দ্রুত টেক্সট তৈরি
        StringBuilder sb = new StringBuilder("Java");
        
        sb.append(" Programming");
        sb.append(" Pro");
        sb.insert(0, "Welcome: ");
        
        System.out.println("Constructed String: " + sb.toString());
        
        // রিভার্স অপারেশন (উল্টো করা)
        sb.reverse();
        System.out.println("Reversed String: " + sb.toString());
        
        // পারফরম্যান্স ডেমোনস্ট্রেশন
        long startTime = System.currentTimeMillis();
        StringBuilder fastBuilder = new StringBuilder();
        for (int i = 0; i < 10000; i++) {
            fastBuilder.append(i);
        }
        long duration = System.currentTimeMillis() - startTime;
        System.out.println("Time taken to append 10,000 numbers: " + duration + " ms!");
    }
}`,
        tips: [
          "লুপের ভেতর বা বড় টেক্সট প্রসেসিংয়ে সর্বদা `StringBuilder` ব্যবহার করুন।",
          "আগে থেকেই জানা থাকলে প্রারম্ভিক ক্যাপাসিটি বলে দেওয়া যায়: `new StringBuilder(1024)`।"
        ],
        commonMistakes: [
          "মাল্টিথ্রেডেড ব্যাকএন্ড ছাড়া অযথা ধীরগতির `StringBuffer` ব্যবহার করা।",
          "StringBuilder কে সরাসরি println এ না দিয়ে `toString()` কল করা পরিষ্কার অভ্যাস।"
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Chapter 09: OOP Foundations - Classes & Objects",
    bengaliTitle: "অধ্যায় ০৯: অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং (OOP) এর ভিত্তি",
    iconName: "Box",
    summary:
      "বাস্তব পৃথিবীর যেকোনো জটিল সিস্টেমকে কোডে ফুটিয়ে তোলার মূল চাবিকাঠি হলো অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং। এই অধ্যায়ে আমরা ক্লাস (ব্লুপ্রিন্ট), অবজেক্ট (ইনস্ট্যান্স), 'new' কিওয়ার্ডের মেমরি বরাদ্দ, কনস্ট্রাক্টর ওভারলোডিং, এবং 'this' কিওয়ার্ডের ব্যবহার শিখব।",
    readingTime: "২৮ মিনিট পাঠ",
    topics: [
      {
        id: "ch9-t1",
        title: "Class Blueprint vs Object Instance",
        bengaliTitle: "ক্লাস (ব্লুপ্রিন্ট) ও অবজেক্ট (বাস্তব ইনস্ট্যান্স)",
        summary: "বাস্তব জগতের বৈশিষ্ট্য ও আচরণকে সফটওয়্যার মডেলে রূপান্তর।",
        explanation: `অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং (OOP)-এর মূল দর্শন হলো কোডকে বাস্তব জগতের সত্তাগুলোর আদলে সাজানো।

### ১. ক্লাস (Class) কী? ব্লুপ্রিন্ট বা নকশা
একটি বাড়ি তৈরি করার আগে আর্কিটেক্ট যেমন একটি কাগজের ব্লুপ্রিন্ট তৈরি করেন—ক্লাস হলো কোডের সেই ব্লুপ্রিন্ট। এতে সংজ্ঞায়িত থাকে:
- **স্টেট বা অ্যাট্রিবিউট (Fields/Variables):** অবজেক্টের বৈশিষ্ট্য বা তথ্য।
- **আচরণ বা ফাংশনালিটি (Methods):** অবজেক্ট কী কী কাজ করতে পারে।
ক্লাস নিজে মেমরিতে কোনো জায়গা দখল করে না যতক্ষণ না তার অবজেক্ট তৈরি হয়।

---

### ২. অবজেক্ট (Object) কী? বাস্তব সত্তা
ব্লুপ্রিন্ট দেখে তৈরি করা বাস্তব বাড়িটি হলো অবজেক্ট। একটি ব্লুপ্রিন্ট থেকে যেমন হাজার হাজার বাড়ি বানানো যায়, তেমনি একটি ক্লাস থেকে মেমরিতে অগণিত অবজেক্ট তৈরি করা যায়।

---

### ৩. new কিওয়ার্ডের তিন ধাপের মেমরি প্রক্রিয়া
\`\`\`java
Student s1 = new Student();
\`\`\`
1. \`Student s1\`: স্ট্যাক মেমরিতে \`s1\` নামের একটি রেফারেন্স ভেরিয়েবল গঠিত হয়।
2. \`new\`: হিপ মেমরিতে \`Student\` ক্লাসের সকল ফিল্ড ধারণ করার জন্য প্রয়োজনীয় মেমরি বরাদ্দ হয় এবং ফিল্ডগুলোকে শূন্য বা নাল দিয়ে ইনিশিয়ালাইজ করা হয়।
3. \`Student()\`: ক্লাসের কনস্ট্রাক্টর কল হয়ে অবজেক্টটি প্রস্তুত হয় এবং হিপের মেমরি অ্যাড্রেসটি \`s1\` ভেরিয়েবলে জমা হয়।`,
        codeExample: `// ১. ব্লুপ্রিন্ট বা ক্লাসের সংজ্ঞা
class Student {
    // স্টেট বা ফিল্ডসমূহ
    String name;
    int rollNumber;
    double gpa;
    
    // আচরণ বা মেথড
    void displayProfile() {
        System.out.printf("Student Name: %-15s | Roll: %d | GPA: %.2f %n", name, rollNumber, gpa);
    }
}

public class Main {
    public static void main(String[] args) {
        // ২. হিপ মেমরিতে দুটি স্বতন্ত্র অবজেক্ট নির্মাণ
        Student student1 = new Student();
        student1.name = "Tahmid Hasan";
        student1.rollNumber = 101;
        student1.gpa = 3.92;
        
        Student student2 = new Student();
        student2.name = "Sumaiya Akter";
        student2.rollNumber = 102;
        student2.gpa = 3.98;
        
        System.out.println("--- Student Database Records ---");
        student1.displayProfile();
        student2.displayProfile();
    }
}`,
        tips: [
          "ক্লাসের নাম সর্বদা PascalCase (যেমন: `StudentRecord`, `BankAccount`) এবং ভেরিয়েবল ও মেথডের নাম camelCase এ রাখুন।",
          "একটি ফাইলে একটি মাত্র public class থাকতে পারে এবং ফাইলের নাম সেই ক্লাসের নামের সাথে মিলতে হবে।"
        ],
        commonMistakes: [
          "অবজেক্টের ইনস্ট্যান্স তৈরি না করেই মেথড কল করা: `Student s; s.displayProfile();` — এটি `NullPointerException` তৈরি করবে কারণ `new` করা হয়নি।",
          "ক্লাসের ভেতর সরাসরি এক্সিকিউটেবল কোড বা println লেখা; কোড অবশ্যই কোনো মেথড বা কনস্ট্রাক্টরের ভেতরে থাকতে হবে।"
        ]
      },
      {
        id: "ch9-t2",
        title: "Constructors & The 'this' Keyword",
        bengaliTitle: "কনস্ট্রাক্টর ওভারলোডিং ও 'this' কিওয়ার্ড",
        summary: "অবজেক্ট সৃষ্টির মুহূর্তে স্টেট ইনিশিয়ালাইজেশন ও ভ্যারিয়েবল শ্যাডোয়িং প্রতিরোধ।",
        explanation: `কনস্ট্রাক্টর হলো ক্লাসের একটি বিশেষ মেথড যা \`new\` কিওয়ার্ড দিয়ে অবজেক্ট তৈরির সাথে সাথে স্বয়ংক্রিয়ভাবে এক্সিকিউট হয়।

### ১. কনস্ট্রাক্টরের বৈশিষ্ট্যসমূহ
- কনস্ট্রাক্টরের নাম অবশ্যই ক্লাসের নামের হুবহু এক হতে হবে।
- এর কোনো রিটার্ন টাইপ থাকে না (এমনকি \`void\` ও নয়)। যদি আপনি \`void\` লিখে দেন, তবে জাভা সেটিকে কনস্ট্রাক্টর না ভেবে একটি সাধারণ মেথড মনে করবে!
- আপনি কোনো কনস্ট্রাক্টর না লিখলে জাভা কম্পাইলার নিজে একটি নো-আর্গুমেন্ট **ডিফল্ট কনস্ট্রাক্টর** যোগ করে দেয়। কিন্তু আপনি নিজে কোনো কনস্ট্রাক্টর লিখলে জাভা আর ডিফল্ট কনস্ট্রাক্টর দেয় না।

---

### ২. 'this' কিওয়ার্ড ও ভ্যারিয়েবল শ্যাডোয়িং (Variable Shadowing)
যখন কনস্ট্রাক্টরের প্যারামিটারের নাম এবং ক্লাসের ফিল্ডের নাম হুবহু একই হয় (যেমন: \`name = name;\`), তখন স্থানীয় প্যারামিটারটি ক্লাসের ফিল্ডকে ঢেকে ফেলে (একে Variable Shadowing বলে)।
জাভায় **\`this\`** হলো এমন একটি রেফারেন্স ভেরিয়েবল যা বর্তমান অবজেক্টকে নির্দেশ করে। তাই স্পষ্ট পার্থক্য করতে আমরা লিখি:
\`\`\`java
this.name = name; // বামের this.name হলো অবজেক্টের ফিল্ড, ডানের name হলো প্যারামিটার
\`\`\`

---

### ৩. কনস্ট্রাক্টর চেইনিং (Constructor Chaining)
একটি কনস্ট্রাক্টর থেকে একই ক্লাসের অন্য একটি কনস্ট্রাক্টরকে কল করতে \`this(...)\` সিনট্যাক্স ব্যবহার করা হয়। এটি কনস্ট্রাক্টরের একেবারে প্রথম লাইনে লিখতে হয়।`,
        codeExample: `class BankAccount {
    private String accountNumber;
    private String accountHolder;
    private double balance;
    
    // ১. ওভারলোডেড কনস্ট্রাক্টর ১ (ডিফল্ট প্রারম্ভিক ব্যালেন্স সহ)
    public BankAccount(String accountNumber, String accountHolder) {
        this(accountNumber, accountHolder, 500.0); // চেইনিং: কনস্ট্রাক্টর ২ কল করছে
    }
    
    // ২. ওভারলোডেড কনস্ট্রাক্টর ২ (পূর্ণাঙ্গ তথ্য সহ)
    public BankAccount(String accountNumber, String accountHolder, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }
    
    public void printAccountSummary() {
        System.out.printf("Account: %-12s | Customer: %-14s | Balance: BDT %.2f %n", 
            accountNumber, accountHolder, balance);
    }
}

public class Main {
    public static void main(String[] args) {
        // চেইনিং কনস্ট্রাক্টর দ্বারা অবজেক্ট তৈরি
        BankAccount acc1 = new BankAccount("AC-1001", "Tanveer Ahmed");
        BankAccount acc2 = new BankAccount("AC-1002", "Farhana Karim", 25000.0);
        
        System.out.println("--- Bank Account Ledger ---");
        acc1.printAccountSummary();
        acc2.printAccountSummary();
    }
}`,
        tips: [
          "কনস্ট্রাক্টর চেইনিংয়ে `this(...)` স্টেটমেন্টটি অবশ্যই কনস্ট্রাক্টরের প্রথম লাইনে হতে হবে, অন্যথায় কম্পাইল এরর হবে।",
          "ডাটা এনক্যাপসুলেশন বজায় রাখতে ক্লাসের ফিল্ডগুলোকে সর্বদা `private` রাখুন এবং কনস্ট্রাক্টর ও গেটার/সেটার দিয়ে মান পরিচালনা করুন।"
        ],
        commonMistakes: [
          "কনস্ট্রাক্টরের আগে ভুলবশত `void` লিখে দেওয়া: `void BankAccount()` লিখলে জাভা একে সাধারণ মেথড গণ্য করে এবং অবজেক্ট ইনিশিয়ালাইজ হয় না।",
          "কনস্ট্রাক্টরে `this.name = name` না লিখে শুধুমাত্র `name = name` লেখা, যার ফলে ফিল্ডের মান নাল (null) বা জিরো থেকে যায়।"
        ]
      }
    ]
  }
];
