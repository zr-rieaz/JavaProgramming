import { Chapter } from "../../types";

export const ch01_to_03_chapters: Chapter[] = [
  {
    id: 1,
    title: "Chapter 01: Java Fundamentals & Architecture",
    bengaliTitle: "অধ্যায় ০১: জাভা পরিচিতি ও অভ্যন্তরীণ আর্কিটেকচার",
    iconName: "Cpu",
    summary:
      "জাভা হলো একটি শক্তিশালী, অবজেক্ট ওরিয়েন্টেড ও প্ল্যাটফর্ম-স্বাধীন প্রোগ্রামিং ভাষা। এই অধ্যায়ে আমরা জাভার ইতিহাস, WORA দর্শন, বাইটকোডের ভূমিকা, JVM মেমরি আর্কিটেকচার (Classloader, Heap, Stack, Metaspace, JIT Compiler) এবং একটি পূর্ণাঙ্গ জাভা অ্যাপ্লিকেশনের শুরু থেকে শেষ পর্যন্ত এক্সিকিউশন প্রক্রিয়া বিস্তারিতভাবে একটি পাঠ্যবইয়ের মতো শিখব।",
    readingTime: "২৫ মিনিট পাঠ",
    topics: [
      {
        id: "ch1-t1",
        title: "JVM Internal Architecture & WORA Philosophy",
        bengaliTitle: "জেভিএম (JVM) এর অভ্যন্তরীণ আর্কিটেকচার ও WORA দর্শন",
        summary: "Write Once, Run Anywhere দর্শন, বাইটকোড (.class), ক্লাসলোডার এবং মেমরি ব্যবস্থাপনা।",
        explanation: `জাভা প্রোগ্রামিং ভাষার সবচেয়ে বড় বৈপ্লবিক বৈশিষ্ট্য হলো **WORA (Write Once, Run Anywhere)**—অর্থাৎ একবার কোড লিখে যেকোনো অপারেটিং সিস্টেমে নির্বিঘ্নে চালানো যায়।

### ১. কীভাবে জাভা প্ল্যাটফর্ম-স্বাধীন হয়?
সি বা সি++ এর মতো সনাতন ভাষায় যখন কোড কম্পাইল করা হয়, তখন তা সরাসরি সেই নির্দিষ্ট অপারেটিং সিস্টেমের মেশিন কোড (বাইনারি কোড)-এ রূপান্তরিত হয়। তাই উইন্ডোজের জন্য কম্পাইল করা বাইনারি লিনাক্স বা ম্যাকওএসে কাজ করে না।

জাভা এই সমস্যা সমাধান করেছে **বাইটকোড (Bytecode)** ও **জাভা ভার্চুয়াল মেশিন (JVM)** এর মাধ্যমে:
1. **জাভাক কম্পাইলার (javac Compiler):** আপনি যখন আপনার সোর্স কোড \`Main.java\` লিখে \`javac Main.java\` কমান্ড দেন, কম্পাইলার কোনো মেশিন কোড তৈরি করে না। বরং এটি মধ্যবর্তী একটি ফরম্যাট তৈরি করে যাকে বলা হয় **বাইটকোড** (যার এক্সটেনশন \`.class\`)।
2. **জেভিএম (Java Virtual Machine):** প্রতিটি অপারেটিং সিস্টেমের জন্য আলাদা আলাদা JVM তৈরি করা থাকে (যেমন উইন্ডোজের জন্য একরকম, উবুন্টু লিনাক্সের জন্য আরেকরকম)। এই JVM সেই সাধারণ \`.class\` বাইটকোড ফাইলটি গ্রহণ করে এবং তৎক্ষণাৎ মেশিনের উপযুক্ত প্রসেসর ইন্সট্রাকশনে রূপান্তর করে চালায়। ফলে প্রোগ্রামারকে অপারেটিং সিস্টেম নিয়ে ভাবতে হয় না।

---

### ২. জেভিএম এর প্রধান তিনটি সাব-সিস্টেম
একটি JVM-এর ভেতরে মূলত তিনটি প্রধান অংশ কাজ করে:

#### ক. ক্লাসলোডার সাব-সিস্টেম (Classloader Subsystem)
এটি ডিস্ক থেকে \`.class\` ফাইলগুলোকে মেমরিতে লোড করে। এর তিনটি ধাপ রয়েছে:
- **Loading:** বাইটকোড লোড করে (Bootstrap Classloader, Platform/Extension Classloader, Application Classloader)।
- **Linking:** লোড করা বাইটকোড সঠিক ও নিরাপদ কিনা তা যাচাই (Verification), ভেরিয়েবলের জন্য মেমরি প্রস্তুত (Preparation) এবং মেমরি রেফারেন্স রেজল্যুশন (Resolution) করে।
- **Initialization:** ক্লাসের স্ট্যাটিক ভেরিয়েবলগুলোতে মান নির্ধারণ করে এবং স্ট্যাটিক ব্লকসমূহ এক্সিকিউট করে।

#### খ. মেমরি এরিয়া (Runtime Data Areas)
- **Method Area (Metaspace):** ক্লাসের মেটাডাটা, ফিল্ড, মেথডের নাম এবং স্ট্যাটিক ভেরিয়েবল এখানে সংরক্ষিত থাকে।
- **Heap Area:** যখনই \`new\` কিওয়ার্ড দিয়ে কোনো অবজেক্ট তৈরি করা হয়, সেই অবজেক্ট হিপ মেমরিতে তৈরি হয়। জাভার স্বয়ংক্রিয় গারবেজ কালেক্টর (GC) এই হিপের অব্যবহৃত অবজেক্ট মুছে ফেলে।
- **JVM Stack:** প্রতিটি থ্রেডের জন্য আলাদা স্ট্যাক ফ্রেম তৈরি হয়। প্রতিটি মেথড কল, লোকাল ভেরিয়েবল এবং রিটার্ন ভ্যালু স্ট্যাকের মধ্যে পুশ ও পপ হয়।
- **PC Register:** প্রসেসর বর্তমানে কোন নির্দেশ (bytecode instruction) এক্সিকিউট করছে তার ঠিকানা ধারণ করে।
- **Native Method Stack:** সি বা সি++ এ লেখা নেটিভ মেথড চালানোর জন্য ব্যবহৃত হয়।

#### গ. এক্সিকিউশন ইঞ্জিন (Execution Engine)
- **ইন্টারপ্রেটার (Interpreter):** বাইটকোডকে লাইন বাই লাইন দ্রুত পড়ে এক্সিকিউট করে।
- **JIT কম্পাইলার (Just-In-Time Compiler):** যে কোড বা লুপ বারবার রান হয় (Hotspots), ইন্টারপ্রেটার বারবার না পড়ে JIT কম্পাইলার সেগুলোকে একবারে আসল মেশিন কোডে রূপান্তর করে ক্যাশে রেখে দেয়, যার ফলে কোড সুপার ফাস্ট রান হয়।
- **গারবেজ কালেক্টর (Garbage Collector):** মেমরিতে যে সকল অবজেক্টের আর কোনো রেফারেন্স নেই, সেগুলোকে মেমরি থেকে সরিয়ে র‍্যাম খালি করে।`,
        codeExample: `// একটি স্বয়ংসম্পূর্ণ জাভা প্রোগ্রাম যা জেভিএম এবং রানটাইম তথ্য প্রদর্শন করে
public class Main {
    public static void main(String[] args) {
        System.out.println("=========================================");
        System.out.println("  JVM Diagnostic Report & System Info");
        System.out.println("=========================================");
        
        // বর্তমান জাভা সংস্করণ ও বিক্রেতা
        System.out.println("Java Runtime Version : " + System.getProperty("java.version"));
        System.out.println("Java Home Directory  : " + System.getProperty("java.home"));
        
        // অপারেটিং সিস্টেম সম্পর্কিত তথ্য
        System.out.println("Operating System     : " + System.getProperty("os.name"));
        System.out.println("OS Architecture      : " + System.getProperty("os.arch"));
        
        // জেভিএম মেমরি বিশ্লেষণ
        Runtime runtime = Runtime.getRuntime();
        long totalMemory = runtime.totalMemory() / (1024 * 1024);
        long maxMemory = runtime.maxMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);
        int availableProcessors = runtime.availableProcessors();
        
        System.out.println("Available CPU Cores  : " + availableProcessors + " Cores");
        System.out.println("Total Allocated Heap : " + totalMemory + " MB");
        System.out.println("Free Heap Memory     : " + freeMemory + " MB");
        System.out.println("Max JVM Heap Limit   : " + maxMemory + " MB");
        System.out.println("=========================================");
        System.out.println("Bytecode executed successfully on JVM!");
    }
}`,
        tips: [
          "পাবলিক ক্লাসের নাম ও সোর্স ফাইলের নাম হুবহু এক হতে হবে (যেমন: public class Main হলে ফাইলটি অবশ্যই Main.java হতে হবে)।",
          "JDK (Java Development Kit) হলো প্রোগ্রামারদের সফটওয়্যার যাতে কম্পাইলার (javac) সহ সব টুল থাকে; আর JRE (Java Runtime Environment) হলো শুধু কোড চালানোর জন্য।",
          "বাইটকোড প্ল্যাটফর্ম-স্বাধীন হলেও জেভিএম (JVM) কিন্তু ওএস-নির্দিষ্ট।"
        ],
        commonMistakes: [
          "পাবলিক ক্লাসের নামের সাথে ফাইলের নামের ক্যাপিটালাইজেশন অমিল থাকা (যেমন: Class Main কিন্তু ফাইল main.java)। জাভা কঠোরভাবে কেস-সেনসিটিভ।",
          "কম্পাইলার (javac) ও জেভিএম (java) কমান্ডের পার্থক্য না বোঝা। কম্পাইল করার সময় ফাইলের নাম দিতে হয় (javac Main.java), কিন্তু রান করার সময় শুধু ক্লাসের নাম দিতে হয় (java Main)।"
        ]
      },
      {
        id: "ch1-t2",
        title: "Structure of a Java Application & Execution Lifecycle",
        bengaliTitle: "জাভা প্রোগ্রামের গঠন ও মেইন মেথডের অভ্যন্তরীণ কাজ",
        summary: "public static void main(String[] args) এর প্রতিটি শব্দের বিস্তারিত ব্যবচ্ছেদ।",
        explanation: `জাভায় প্রতিটি কোড অবশ্যই কোনো না কোনো ক্লাসের ভেতরে থাকতে হয়। জাভা প্রোগ্রামের প্রবেশের দরজা হলো \`main\` মেথড।

\`\`\`java
public static void main(String[] args)
\`\`\`

এই লাইনটির প্রতিটি শব্দের একটি নির্দিষ্ট কারিগরি ভূমিকা রয়েছে যা নিচে বিস্তারিত তুলে ধরা হলো:

1. **public (অ্যাক্সেস মডিফায়ার):**
   \`public\` কিওয়ার্ডের অর্থ হলো এই মেথডটিকে ক্লাসের বাইরে থেকে যেকোনো জায়গা থেকে কল করা যাবে। যেহেতু JVM ক্লাসের বাইরের একটি স্বতন্ত্র প্রোগ্রাম, তাই মেইন মেথড পাবলিক না হলে JVM এটিকে খুঁজে পাবে না এবং \`NoSuchMethodError: main\` এরর দেবে।

2. **static (ক্লাস-লেভেল মেথড):**
   সাধারণ মেথড কল করতে হলে ক্লাসের অবজেক্ট তৈরি করতে হয় (\`new Main()\`)। কিন্তু প্রোগ্রামটি শুরু হওয়ার সময় তখনো কোনো অবজেক্ট তৈরি হয়নি। \`static\` করার ফলে JVM কোনো অবজেক্ট তৈরি না করেই সরাসরি ক্লাসের নাম দিয়ে মেথডটি চালাতে পারে (\`Main.main()\`)। এতে মেমরি বাঁচে ও প্রোগ্রামের বুটস্ট্র্যাপিং দ্রুত হয়।

3. **void (রিটার্ন টাইপ):**
   \`void\` নির্দেশ করে যে এই মেথডটি কোনো মান রিটার্ন করে না। সি বা সি++ এ \`main\` ফাংশন থেকে \`return 0\` দেওয়া হয় অপারেটিং সিস্টেমকে স্ট্যাটাস জানাতে। তবে জাভায় JVM নিজেই সব হ্যান্ডেল করে, তাই কোনো মান রিটার্ন করার প্রয়োজন হয় না। যদি কখনো কোডের মাঝপথে জোরপূর্বক বন্ধ করতে হয়, তবে \`System.exit(0)\` ব্যবহার করা হয়।

4. **main (মেথডের নাম):**
   এটি জাভার নির্ধারিত এন্ট্রি পয়েন্টের নাম। JVM এর সোর্স কোডে স্পষ্ট নির্দেশ দেওয়া থাকে যে প্রোগ্রাম শুরু করার সময় \`main\` নামের মেথডটিকে অনুসন্ধান করতে হবে।

5. **String[] args (কমান্ড লাইন আর্গুমেন্ট):**
   এটি স্ট্রিং ডাটা টাইপের একটি অ্যারে। টার্মিনাল বা কনসোল থেকে প্রোগ্রাম চালানোর সময় যদি কোনো প্যারামিটার বা আর্গুমেন্ট পাঠানো হয় (যেমন: \`java Main user1 5000\`), তবে সেই মানগুলো এই \`args\` অ্যারেতে সংরক্ষিত হয়।

---

### System.out.println() এর অভ্যন্তরীণ রহস্য
- **System:** এটি \`java.lang\` প্যাকেজের একটি বিল্ট-ইন ফাইনাল ক্লাস।
- **out:** এটি \`System\` ক্লাসের একটি \`public static final PrintStream\` টাইপের অবজেক্ট, যা সিস্টেমের স্ট্যান্ডার্ড আউটপুট কনসোলকে নির্দেশ করে।
- **println():** এটি \`PrintStream\` ক্লাসের একটি মেথড, যা কনসোলে টেক্সট প্রিন্ট করে নতুন একটি লাইনে কার্সর নিয়ে যায়।`,
        codeExample: `public class Main {
    // জাভা অ্যাপ্লিকেশনের প্রবেশদ্বার
    public static void main(String[] args) {
        System.out.println("Step 1: Main class loaded into Metaspace.");
        System.out.println("Step 2: JVM started main execution thread.");
        System.out.println("Step 3: Executing main method logic.");
        
        // কমান্ড লাইন আর্গুমেন্ট পর্যবেক্ষণ
        if (args != null && args.length > 0) {
            System.out.println("Command line arguments received:");
            for (int i = 0; i < args.length; i++) {
                System.out.println("  Argument [" + i + "]: " + args[i]);
            }
        } else {
            System.out.println("No command line arguments provided (Default mode).");
        }
        
        System.out.println("Step 4: Program completed successfully and exited.");
    }
}`,
        tips: [
          "main মেথডের আর্গুমেন্টকে `String args[]` বা `String... args` (varargs) হিসেবেও লেখা যায়।",
          "জাভায় প্রতিটি স্টেটমেন্টের শেষে অবশ্যই সেমিকোলন (;) দিতে হয়, অন্যথায় সিনট্যাক্স এরর হবে।"
        ],
        commonMistakes: [
          "System এর 'S' ছোট হাতের লেখা (`system.out.println`)। জাভায় ক্লাস নেম সবসময় বড় হাতের অক্ষর দিয়ে শুরু হয়।",
          "main মেথডের স্পেলিং ভুল করা বা static কিওয়ার্ড ভুলে বাদ দেওয়া।"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Chapter 02: Primitive Data Types & Type Casting",
    bengaliTitle: "অধ্যায় ০২: ডাটা টাইপ, মেমরি বিন্যাস ও টাইপ কাস্টিং",
    iconName: "Binary",
    summary:
      "মেমরিতে ডাটা কীভাবে সংরক্ষিত হয় তা বোঝা দক্ষ প্রোগ্রামার হওয়ার মূল চাবিকাঠি। এই অধ্যায়ে আমরা জাভার ৮টি প্রিমিটিভ ডাটা টাইপ, তাদের মেমরি সাইজ, রেঞ্জ, টু'স কমপ্লিমেন্ট বাইনারি প্রেজেন্টেশন এবং টাইপ কাস্টিংয়ের (Widening ও Narrowing) অভ্যন্তরীণ নিয়ম ও নির্ভুল প্রয়োগ শিখব।",
    readingTime: "২৬ মিনিট পাঠ",
    topics: [
      {
        id: "ch2-t1",
        title: "The 8 Primitive Data Types & Memory Layout",
        bengaliTitle: "৮টি প্রিমিটিভ ডাটা টাইপ ও মেমরি সাইজ",
        summary: "byte, short, int, long, float, double, char, boolean এর বিস্তারিত বিশ্লেষণ।",
        explanation: `জাভায় ডাটা টাইপ প্রধানত দুই প্রকার:
1. **প্রিমিটিভ (Primitive):** সরাসরি মেমরিতে মান (value) সংরক্ষণ করে।
2. **নন-প্রিমিটিভ (Non-primitive/Reference):** মেমরিতে অবজেক্টের অ্যাড্রেস বা রেফারেন্স সংরক্ষণ করে (যেমন: String, Array, Class)।

জাভায় ৮টি মৌলিক প্রিমিটিভ ডাটা টাইপ রয়েছে:

### ক. পূর্ণসংখ্যা (Integer Types)
কম্পিউটারের মেমরিতে এগুলো **Two's Complement** পদ্ধতিতে সংরক্ষিত হয়:
- **byte:** সাইজ ১ বাইট (৮ বিট)। মান রেঞ্জ: $-128$ থেকে $+127$ ($2^7$ পর্যন্ত)। নেটওয়ার্ক স্ট্রিম বা বাইনারি ফাইল পড়ার সময় মেমরি বাঁচাতে ব্যবহৃত হয়।
- **short:** সাইজ ২ বাইট (১৬ বিট)। মান রেঞ্জ: $-32,768$ থেকে $+32,767$।
- **int:** সাইজ ৪ বাইট (৩২ বিট)। মান রেঞ্জ: $-2^{31}$ থেকে $+2^{31}-1$ (প্রায় $-২১৪$ কোটি থেকে $+২১৪$ কোটি)। জাভায় যেকোনো পূর্ণসংখ্যার ডিফল্ট টাইপ হলো \`int\`।
- **long:** সাইজ ৮ বাইট (৬৪ বিট)। মান রেঞ্জ: $-2^{63}$ থেকে $+2^{63}-1$। বিশাল সংখ্যা বোঝাতে সংখ্যার শেষে 'L' বা 'l' যোগ করতে হয় (যেমন: \`9000000000L\`)।

### খ. দশমিক সংখ্যা (Floating-Point Types)
এগুলো **IEEE 754** স্ট্যান্ডার্ড অনুসরণ করে:
- **float:** সাইজ ৪ বাইট (৩২ বিট)। এটি সিঙ্গল-প্রিসিশন (Single Precision) ফ্লোটিং পয়েন্ট (প্রায় ৬-৭ দশমিক স্থান পর্যন্ত নির্ভুল)। ফ্লোট লিটারেলের শেষে অবশ্যই 'f' বা 'F' লিখতে হয় (যেমন: \`3.1416f\`)।
- **double:** সাইজ ৮ বাইট (৬৪ বিট)। এটি ডাবল-প্রিসিশন (Double Precision) ফ্লোটিং পয়েন্ট (১৫-১৬ দশমিক স্থান পর্যন্ত নির্ভুল)। জাভায় যেকোনো দশমিক সংখ্যার ডিফল্ট টাইপ হলো \`double\`।

### গ. টেক্সট ও কন্ডিশনাল টাইপ
- **char:** সাইজ ২ বাইট (১৬ বিট)। জাভায় ক্যারেক্টার সংরক্ষণে **Unicode (UTF-16)** ব্যবহৃত হয়। তাই সি এর মতো শুধু ইংরেজি বর্ণ নয়, বাংলা, আরবি, চাইনিজ যেকোনো ভাষার বর্ণ বা ইমোজি ধারণ করতে পারে (যেমন: \`'ক'\`, \`'A'\`)। ক্যারেক্টার সিঙ্গেল কোটেশন (\`' '\`) দিয়ে লিখতে হয়।
- **boolean:** সাইজ মাত্র ১ বিট লজিক্যাল কনসেপ্ট (জেভিএম সাধারণত ১ বাইট ব্যবহার করে)। এর সম্ভাব্য মান মাত্র দুটি: \`true\` অথবা \`false\`। জাভায় অন্য ভাষার মতো ০ বা ১ কে বুলিয়ান হিসেবে ব্যবহার করা যায় না।`,
        codeExample: `public class Main {
    public static void main(String[] args) {
        // পূর্ণসংখ্যা টাইপসমূহ
        byte age = 25;
        short companyBranches = 450;
        int employeeId = 1045892;
        long nationalBudget = 790000000000L; // শেষে L আবশ্যক
        
        // দশমিক টাইপসমূহ
        float temperatureCelsius = 36.6f;     // শেষে f আবশ্যক
        double piHighPrecision = 3.141592653589793;
        
        // ক্যারেক্টার ও বুলিয়ান
        char gradeLetter = 'A';
        char unicodeChar = 'X'; // ১৬-বিট ইউনিকোড সমর্থন
        boolean isServerRunning = true;
        
        System.out.println("--- Data Types Demonstration ---");
        System.out.println("Byte Value        : " + age + " (Memory: 1 byte)");
        System.out.println("Short Value       : " + companyBranches + " (Memory: 2 bytes)");
        System.out.println("Integer Value     : " + employeeId + " (Memory: 4 bytes)");
        System.out.println("Long Value        : " + nationalBudget + " (Memory: 8 bytes)");
        System.out.println("Float Value       : " + temperatureCelsius + " (Memory: 4 bytes)");
        System.out.println("Double Value      : " + piHighPrecision + " (Memory: 8 bytes)");
        System.out.println("Grade Character   : " + gradeLetter);
        System.out.println("Unicode Character : " + unicodeChar + " (Unicode: " + (int)unicodeChar + ")");
        System.out.println("Boolean Flag      : " + isServerRunning);
    }
}`,
        tips: [
          "বড় সংখ্যার পাঠযোগ্যতা বাড়াতে জাভা ৭ থেকে আন্ডারস্কোর ব্যবহার করা যায় (যেমন: `int million = 1_000_000;`)।",
          "টাকা-পয়সা বা অত্যন্ত সংবেদনশীল আর্থিক হিসাবের জন্য float বা double ব্যবহার করা উচিত নয় (রাউন্ডিং এররের জন্য); সে ক্ষেত্রে `java.math.BigDecimal` ব্যবহার করা স্ট্যান্ডার্ড।"
        ],
        commonMistakes: [
          "ফ্লোট ভেরিয়েবলে মান লেখার সময় 'f' না দেওয়া (যেমন: `float f = 4.5;` লিখলে কম্পাইল এরর হবে, কারণ ৪.৫ হলো ডিফল্ট double)। সঠিক রূপ: `float f = 4.5f;`।",
          "byte এর সর্বোচ্চ সীমা ১২৭ এর চেয়ে বড় মান রাখা (যেমন: `byte b = 130;`), যা সরাসরি 'possible loss of precision' এরর সৃষ্টি করে।"
        ]
      },
      {
        id: "ch2-t2",
        title: "Widening vs Narrowing Type Casting & Truncation",
        bengaliTitle: "টাইপ কাস্টিং: ওয়াইডেনিং বনাম ন্যারোয়িং ও ট্রাঙ্কেশন",
        summary: "ইমপ্লিসিট কাস্টিং ও এক্সপ্লিসিট কাস্টিং এর নিয়ম এবং ইন্টিজার ডিভিশন ট্র্যাপ।",
        explanation: `এক ডাটা টাইপের মানকে অন্য ডাটা টাইপে রূপান্তর করার প্রক্রিয়াকে **টাইপ কাস্টিং (Type Casting)** বলা হয়। জাভায় টাইপ কাস্টিং দুই ধরনের:

### ১. অটোমেটিক বা ওয়াইডেনিং কাস্টিং (Widening / Implicit Casting)
ছোট মেমরির ডাটা টাইপ থেকে বড় মেমরির ডাটা টাইপে রূপান্তরের ক্ষেত্রে কোনো ডাটা হারানোর ভয় থাকে না। তাই জাভা কম্পাইলার স্বয়ংক্রিয়ভাবে এই রূপান্তর সম্পন্ন করে।
**ক্রমধারা:**
\`byte -> short -> int -> long -> float -> double\`

যেমন: একটি ছোট গ্লাসের পানি অনায়াসে একটি বড় বালতিতে ঢেলে দেওয়া যায়, এতে কোনো পানি উপচে পড়ে না।

### ২. ম্যানুয়াল বা ন্যারোয়িং কাস্টিং (Narrowing / Explicit Casting)
বড় মেমরির ডাটা টাইপকে ছোট মেমরির ডাটা টাইপে জোরপূর্বক রূপান্তর করা। এতে ডাটা হারিয়ে যাওয়ার (Data loss / Truncation) ঝুঁকি থাকে। তাই কম্পাইলার একা এটি করে না, প্রোগ্রামারকে ব্র্যাকেটের ভেতরে কাঙ্ক্ষিত টাইপের নাম লিখে স্পষ্ট অনুমতি দিতে হয়।
**ক্রমধারা:**
\`double -> float -> long -> int -> short -> byte\`

যেমন: একটি বড় বালতির পানি ছোট গ্লাসে ঢালতে গেলে অতিরিক্ত পানি উপচে পড়ে নষ্ট হবে।

### ৩. ইন্টিজার ডিভিশন ট্র্যাপ (Integer Division Trap)
নতুন শিক্ষার্থীদের সবচেয়ে সাধারণ ভুল হলো দুটি \`int\` ভাগ করা। জাভায় যখন দুটি পূর্ণসংখ্যা ভাগ করা হয় (\`int / int\`), ফলাফলও পূর্ণসংখ্যা হয় এবং দশমিক অংশ কেটে বাদ দেওয়া হয় (Truncation)।
\`\`\`java
int a = 5;
int b = 2;
double result = a / b; // ফলাফল হবে 2.0 (২.৫ নয়!)
\`\`\`
এখানে \`5 / 2\` আগে ভাগ হয়ে \`2\` হয়, তারপর সেই \`2\` ডাবলে রূপান্তরিত হয়ে \`2.0\` হয়। সঠিক ২.৫ পেতে হলে যেকোনো একটি সংখ্যাকে আগেই \`double\` এ কাস্ট করতে হবে:
\`\`\`java
double correct = (double) a / b; // ৫.০ / ২ = ২.৫
\`\`\``,
        codeExample: `public class Main {
    public static void main(String[] args) {
        // ১. অটোমেটিক ওয়াইডেনিং (ইমপ্লিসিট)
        int basicSalary = 45000;
        double salaryInDouble = basicSalary; // স্বয়ংক্রিয়ভাবে 45000.0 তে রূপান্তরিত
        System.out.println("Automatic Widening (int -> double): " + salaryInDouble);
        
        // ২. ম্যানুয়াল ন্যারোয়িং (এক্সপ্লিসিট)
        double exactPi = 3.9999;
        int truncatedPi = (int) exactPi; // দশমিকের পর সব ছাঁটাই হয়ে ৩ থাকবে
        System.out.println("Manual Narrowing (double -> int): " + truncatedPi);
        
        // ৩. পূর্ণসংখ্যা ওভারফ্লো ন্যারোয়িং
        int bigNumber = 130;
        byte overflowByte = (byte) bigNumber; // byte রেঞ্জ -128 থেকে 127
        System.out.println("Byte Overflow Result: " + overflowByte + " (Cyclic overflow)");
        
        // ৪. ইন্টিজার ডিভিশন সমাধান
        int totalMarks = 195;
        int totalSubjects = 2;
        
        double wrongAvg = totalMarks / totalSubjects;        // ভুল: 97.0
        double rightAvg = (double) totalMarks / totalSubjects; // সঠিক: 97.5
        
        System.out.println("Wrong Average (Integer Division) : " + wrongAvg);
        System.out.println("Right Average (Type Casted)      : " + rightAvg);
    }
}`,
        tips: [
          "কখনো দশমিক বাদ দেওয়া আটকাতে ভাগের আগে অন্তত একটি অপারেন্ডকে `(double)` করে নিন।",
          "ক্যারেক্টারকে পূর্ণসংখ্যায় কাস্ট করলে তার ASCII / Unicode মান পাওয়া যায় (যেমন: `(int) 'A'` এর মান ৬৫)।"
        ],
        commonMistakes: [
          "ন্যারোয়িং কাস্টিংয়ে রাউন্ডিং প্রত্যাশা করা: `(int) 7.9` এর ফলাফল ৮ হবে না, সরাসরি দশমিক কেটে ৭ হবে।",
          "বড় সংখ্যাকে ছোট টাইপে কাস্ট করার পর অপ্রত্যাশিত ঋণাত্মক মান দেখে বিভ্রান্ত হওয়া (বাইট সীমার কারণে)।"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Chapter 03: Operators, Scanner & Formatted I/O",
    bengaliTitle: "অধ্যায় ০৩: অপারেটর, স্ক্যানার ও ফরম্যাটেড ইনপুট-আউটপুট",
    iconName: "Terminal",
    summary:
      "কম্পিউটারকে কার্যকরভাবে নির্দেশ দেওয়া এবং ব্যবহারকারীর সাথে যোগাযোগ স্থাপনের জন্য অপারেটর ও I/O জানা আবশ্যক। এই অধ্যায়ে আমরা বিভিন্ন প্রকার অপারেটর, শর্ট-সার্কিট লজিক, Scanner ক্লাসের বাফার ক্লিয়ারিং ট্রিক এবং System.out.printf ফরম্যাটিং শিখব।",
    readingTime: "২৮ মিনিট পাঠ",
    topics: [
      {
        id: "ch3-t1",
        title: "Operators, Precedence & Short-Circuit Logic",
        bengaliTitle: "অপারেটরসমূহ, অগ্রাধিকার ক্রম ও শর্ট-সার্কিট লজিক",
        summary: "অ্যারিথমেটিক, রিলেশনাল, লজিক্যাল ও টার্নারি অপারেটরের গভীর কৌশল।",
        explanation: `জাভায় অপারেটর হলো এমন কিছু বিশেষ প্রতীক যা ভেরিয়েবল ও মানের ওপর নির্দিষ্ট অপারেশন সম্পন্ন করতে ব্যবহৃত হয়।

### ১. অপারেটরের প্রধান প্রকারভেদ
- **অ্যারিথমেটিক অপারেটর (Arithmetic):** \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (ভাগশেষ বা মডিউলাস)।
- **রিলেশনাল অপারেটর (Relational):** \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`। এরা সব সময় বুলিয়ান মান (\`true\` বা \`false\`) প্রদান করে।
- **লজিক্যাল অপারেটর (Logical):** \`&&\` (AND), \`||\` (OR), \`!\` (NOT)।
- **টার্নারি অপারেটর (Ternary):** \`condition ? trueValue : falseValue\`। এটি এক লাইনে \`if-else\` লেখার সংক্ষিপ্ত রূপ।
- **বিটওয়াইজ অপারেটর (Bitwise):** \`&\`, \`|\`, \`^\`, \`~\`, \`<<\`, \`>>\` (সরাসরি বিট পর্যায়ে কাজ করে)।

---

### ২. শর্ট-সার্কিট ইভ্যালুয়েশন (Short-Circuit Evaluation)
জাভার লজিক্যাল অপারেটর \`&&\` এবং \`||\` খুব স্মার্টভাবে কাজ করে:
- **লজিক্যাল AND (\`&&\`):** যদি প্রথম শর্তটি \`false\` হয়, তবে কম্পাইলার পরবর্তী শর্তগুলো আর চেকই করে না। কারণ একটি শর্ত মিথ্যা হলেই পুরো ফলাফল মিথ্যা হবে।
  *উদাহরণ:* \`if (user != null && user.isActive())\` — এখানে যদি \`user\` আসলেই \`null\` হয়, তবে দ্বিতীয় অংশ \`user.isActive()\` এক্সিকিউট হবে না। ফলে কোনো \`NullPointerException\` ঘটবে না!
- **লজিক্যাল OR (\`||\`):** যদি প্রথম শর্তটি \`true\` হয়, তবে পরবর্তী শর্তগুলো আর চেক করা হয় না, কারণ যেকোনো একটি সত্য হলেই পুরো স্টেটমেন্ট সত্য হয়।

---

### ৩. প্রি-ইনক্রিমেন্ট বনাম পোস্ট-ইনক্রিমেন্ট
- **Pre-increment (\`++x\`):** আগে ভ্যালু ১ বাড়বে, তারপর কারেন্ট স্টেটমেন্টে ব্যবহার হবে।
- **Post-increment (\`x++\`):** বর্তমান স্টেটমেন্টে আগের ভ্যালুই ব্যবহার হবে, লাইন শেষ হওয়ার পর মান ১ বাড়বে।`,
        codeExample: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        
        // পোস্ট বনাম প্রি ইনক্রিমেন্ট
        int post = a++; // post পাবে ১০, কিন্তু এরপর a হয়ে যাবে ১১
        int pre = ++b;  // b হবে ২১, pre পাবে ২১
        
        System.out.println("Post-increment Value : " + post + ", Current a : " + a);
        System.out.println("Pre-increment Value  : " + pre + ", Current b : " + b);
        
        // শর্ট-সার্কিট লজিকের চমৎকার সুরক্ষা
        String message = null;
        // যদি সাধারণ & ব্যবহার করা হতো, তবে ক্র্যাশ করত। কিন্তু && এর কারণে ক্র্যাশ করবে না:
        if (message != null && message.length() > 0) {
            System.out.println("Message: " + message);
        } else {
            System.out.println("Short-circuit protected from NullPointerException!");
        }
        
        // টার্নারি অপারেটর
        int marks = 75;
        String status = (marks >= 40) ? "Passed" : "Failed";
        System.out.println("Examination Result    : " + status);
    }
}`,
        tips: [
          "জটিল শর্ত লেখার সময় অপারেটরের অগ্রাধিকার (Precedence) নিয়ে দ্বিধা দূর করতে প্রথম বন্ধনী `( )` ব্যবহার করুন।",
          "টার্নারি অপারেটর কোডকে সংক্ষিপ্ত করলেও নেস্টেড টার্নারি কোডের পাঠযোগ্যতা নষ্ট করে, তাই সহজ শর্তেই ব্যবহার শ্রেয়।"
        ],
        commonMistakes: [
          "অ্যাসাইনমেন্ট অপারেটর (`=`) এবং সমতা যাচাইকারী অপারেটর (`==`) এর মধ্যে গুলিয়ে ফেলা।",
          "স্ট্রিং তুলনা করতে `==` ব্যবহার করা। দুটি স্ট্রিংয়ের কন্টেন্ট মেলাতে সর্বদা `str1.equals(str2)` ব্যবহার করতে হয়।"
        ]
      },
      {
        id: "ch3-t2",
        title: "Scanner Class Pitfall & Formatted Output (printf)",
        bengaliTitle: "স্ক্যানার ইনপুট বাফার ট্র্যাপ ও ফরম্যাটেড আউটপুট (printf)",
        summary: "nextInt() এর পর nextLine() স্কিপ হওয়ার কারণ এবং সমাধান।",
        explanation: `কনসোল থেকে ব্যবহারকারীর ইনপুট নিতে জাভায় \`java.util.Scanner\` ক্লাস বহুল ব্যবহৃত হয়।

### ১. স্ক্যানারের কুখ্যাত ইনপুট বাফার ট্র্যাপ (Input Buffer Trap)
যখন আমরা কীবোর্ড থেকে ইনপুট দিই, অপারেটিং সিস্টেম প্রতিটি কি-স্ট্রোক একটি "ইনপুট বাফার"-এ জমা রাখে।
ধরুন ব্যবহারকারী টাইপ করলেন:
\`\`\`text
25 [Enter]
\`\`\`
বাফারে জমা হয় \`"25\\n"\`।
এখন আপনি যদি লেখেন:
\`\`\`java
int age = sc.nextInt();
String name = sc.nextLine();
\`\`\`
এখানে কী ঘটে?
1. \`sc.nextInt()\` শুধুমাত্র সংখ্যা \`25\` অংশটুকু পড়ে নেয়। কিন্তু শেষের এন্টার কি (\`\\n\`) টি বাফারেই পড়ে থাকে!
2. এরপর যখন কোড \`sc.nextLine()\` এ পৌঁছায়, \`nextLine()\` বাফারে থাকা সেই অবশিষ্ট \`\\n\` কেই একটি ফাঁকা লাইন (\`""\`) মনে করে পড়ে নেয় এবং ব্যবহারকারীকে নাম লেখার কোনো সুযোগ না দিয়েই সামনে এগিয়ে যায়!

**সমাধান (Buffer Clearing Trick):**
যেকোনো সংখ্যা বা শব্দ পড়ার পর (\`nextInt()\`, \`nextDouble()\`, \`next()\`), যদি আপনি পূর্ণ বাক্য পড়তে চান, তার ঠিক আগে একটি অতিরিক্ত \`sc.nextLine()\` লিখে বাফারটি পরিষ্কার করে নিতে হবে।

---

### ২. পেশাদার ফরম্যাটেড আউটপুট (System.out.printf)
সিস্টেমের \`printf\` মেথড সি ল্যাঙ্গুয়েজের মতো নির্ভুল টেবিল ও ডেসিমাল ফরম্যাটিং তৈরি করতে পারে:
- \`%d\` : পূর্ণসংখ্যা (Decimal Integer)
- \`%f\` : দশমিক সংখ্যা (যেমন: \`%.2f\` লিখলে দশমিকের পর ঠিক দুই ঘর দেখাবে)
- \`%s\` : স্ট্রিং (যেমন: \`%-15s\` লিখলে বাম পাশে সাজিয়ে ১৫ অক্ষরের জায়গা রাখবে)
- \`%n\` : প্ল্যাটফর্ম স্বাধীন নতুন লাইন (উইন্ডোজ ও লিনাক্স উভয়তেই সঠিক কাজ করে)`,
        codeExample: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // ডেমো প্রদর্শনের জন্য সিমুলেটেড ইনপুট স্ক্যানার
        String simulatedInput = "101\\nAbdur Rahim\\n3.875\\n";
        Scanner sc = new Scanner(simulatedInput);
        
        System.out.println("=== Student Admission Data Processing ===");
        
        // ১. রোল নম্বর গ্রহণ
        System.out.print("Enter Roll Number: ");
        int roll = sc.nextInt();
        
        // ২. গুরুত্বপূর্ণ ধাপ: ইনপুট বাফারের অবশিষ্ট এন্টার (\\n) মুছে ফেলা
        sc.nextLine();
        
        // ৩. পূর্ণ নাম গ্রহণ (এখন আর স্কিপ হবে না!)
        System.out.print("Enter Full Name: ");
        String fullName = sc.nextLine();
        
        // ৪. জিপিএ গ্রহণ
        System.out.print("Enter GPA: ");
        double gpa = sc.nextDouble();
        
        // ৫. printf দিয়ে চমৎকার ফরম্যাটেড রিপোর্ট তৈরি
        System.out.println("\\n=========== Academic Transcript ===========");
        System.out.printf("| %-10s : %04d %n", "Roll Number", roll);
        System.out.printf("| %-10s : %-20s %n", "Student Name", fullName);
        System.out.printf("| %-10s : %.2f (Rounded) %n", "GPA", gpa);
        System.out.println("================================================");
        
        sc.close();
    }
}`,
        tips: [
          "Scanner ব্যবহার শেষ হলে মেমরি লিক এড়াতে সর্বদা `sc.close()` করা উত্তম।",
          "একটি মাত্র শব্দ পড়তে `sc.next()` এবং স্পেস সহ পুরো লাইন পড়তে `sc.nextLine()` ব্যবহার করুন।"
        ],
        commonMistakes: [
          "`nextInt()` এর পর বাফার ক্লিয়ার না করে সরাসরি `nextLine()` কল করা, যার ফলে ইনপুট স্কিপ হয়ে যায়।",
          "`printf` এ ডাটা টাইপের ফরম্যাট স্পেসিফায়ার ভুল করা (যেমন স্ট্রিংয়ের জন্য `%d` দিয়ে বসালে `IllegalFormatConversionException` ঘটবে)।"
        ]
      }
    ]
  }
];
