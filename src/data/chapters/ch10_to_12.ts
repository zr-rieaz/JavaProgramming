import { Chapter } from "../../types";

export const ch10_to_12_chapters: Chapter[] = [
  {
    id: 10,
    title: "Chapter 10: OOP Foundations - Classes, Objects & Constructors",
    bengaliTitle: "অধ্যায় ১০: অবজেক্ট ওরিয়েন্টেড ভিত্তি ও কনস্ট্রাক্টর আর্কিটেকচার",
    iconName: "Box",
    summary:
      "অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং (OOP)-এর গভীর উপলব্ধি ছাড়া আধুনিক সফটওয়্যার তৈরি অসম্ভব। এই অধ্যায়ে আমরা ক্লাস ও অবজেক্টের সম্পর্ক, মেমরি স্ট্যাক ও হিপ বিন্যাস, 'new' কিওয়ার্ডের মেমরি বরাদ্দ, কনস্ট্রাক্টরের মাধ্যমে স্টেট ইনিশিয়ালাইজেশন, ভ্যারিয়েবল শ্যাডোয়িং এবং 'this' কিওয়ার্ডের সাহায্যে কনস্ট্রাক্টর চেইনিং বিস্তারিত বইয়ের মতো শিখব।",
    readingTime: "২৬ মিনিট পাঠ",
    topics: [
      {
        id: "ch10-t1",
        title: "Class Blueprint vs Object Instance",
        bengaliTitle: "ক্লাস ব্লুপ্রিন্ট বনাম অবজেক্ট ইনস্ট্যান্স",
        summary: "বাস্তব জগতের বৈশিষ্ট্য ও আচরণকে জাভা মডেলে নিখুঁতভাবে রূপান্তর।",
        explanation: `অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিংয়ে জটিল সফটওয়্যারকে বাস্তব পৃথিবীর বিভিন্ন সত্তার মতো করে চিন্তা করা হয়।

### ১. ক্লাস (Class): নকশা বা ব্লুপ্রিন্ট
ক্লাস হলো একটি ব্যবহারকারী-সংজ্ঞায়িত ডাটা টাইপ (User-defined blueprint)। এতে সংজ্ঞায়িত থাকে:
- **অ্যাট্রিবিউট / ফিল্ডস (State):** অবজেক্টের গুণাবলী (যেমন: গাড়ির রঙ, গতি, ইঞ্জিনের ধরন)।
- **মেথড / ফাংশনালিটি (Behavior):** অবজেক্ট কী কী কাজ করতে পারে (যেমন: এক্সিলারেট করা, ব্রেক কষা)।

### ২. অবজেক্ট (Object): বাস্তব মেমরি ইনস্ট্যান্স
ব্লুপ্রিন্ট দেখে তৈরি করা বাস্তব বস্তু হলো অবজেক্ট।
\`\`\`java
Student s1 = new Student();
\`\`\`
এখানে:
- \`Student s1\`: স্ট্যাক মেমরিতে রেফারেন্স পয়েন্টার তৈরি হয়।
- \`new\`: হিপ মেমরিতে \`Student\` অবজেক্টের জন্য জায়গা বরাদ্দ করে।
- \`Student()\`: ক্লাসের কনস্ট্রাক্টর কল হয়ে ফিল্ডগুলো ইনিশিয়ালাইজ করে।

---

### ৩. অবজেক্টের জীবনচক্র ও গারবেজ কালেকশন (GC)
যখন কোনো অবজেক্টের রেফারেন্স নাল (\`null\`) করে দেওয়া হয় বা তার স্কোপ শেষ হয়ে যায় (যেমন মেথড শেষ হলে), তখন সেই অবজেক্টটিকে বলা হয় **Unreachable Object**। জেভিএম এর **Garbage Collector (GC)** ব্যাকগ্রাউন্ডে নিয়মিত চলে মেমরির এই অপ্রয়োজনীয় অবজেক্টগুলোকে ধ্বংস করে র‍্যাম খালি করে। সি/সি++ এর মতো প্রোগ্রামারকে ম্যানুয়ালি মেমরি ডিলিট (\`free()\` বা \`delete\`) করতে হয় না।`,
        codeExample: `// ১. ব্লুপ্রিন্ট সংজ্ঞা
class Employee {
    String name;
    String department;
    double monthlySalary;
    
    void printPayslip() {
        System.out.printf("Employee Name: %-15s | Dept: %-12s | Salary: BDT %.2f %n", 
            name, department, monthlySalary);
    }
}

public class Main {
    public static void main(String[] args) {
        // হিপ মেমরিতে দুটি ভিন্ন অবজেক্ট
        Employee emp1 = new Employee();
        emp1.name = "Ariful Islam";
        emp1.department = "Software Engineering";
        emp1.monthlySalary = 85000.0;
        
        Employee emp2 = new Employee();
        emp2.name = "Nusrat Jahan";
        emp2.department = "Product Design";
        emp2.monthlySalary = 75000.0;
        
        System.out.println("--- Corporate Payroll Ledger ---");
        emp1.printPayslip();
        emp2.printPayslip();
    }
}`,
        tips: [
          "ক্লাসের নাম সবসময় PascalCase (যেমন: `CustomerAccount`) এবং ফিল্ডের নাম camelCase এ লিখুন।",
          "মেমরি অপটিমাইজ করতে অপ্রয়োজনীয় বড় অবজেক্টের কাজ শেষ হলে সেটিকে `null` করে দিলে GC দ্রুত মেমরি মুক্ত করতে পারে।"
        ],
        commonMistakes: [
          "অবজেক্ট ইনিশিয়ালাইজ না করেই ফিল্ড অ্যাক্সেস করা: `Employee e; e.printPayslip();` — কম্পাইল এরর `variable might not have been initialized` দেবে।",
          "ক্লাসের ভেতর মেথডের বাইরে সরাসরি কোড লেখা।"
        ]
      },
      {
        id: "ch10-t2",
        title: "Constructors & Constructor Chaining",
        bengaliTitle: "কনস্ট্রাক্টর ওভারলোডিং ও 'this(...)' চেইনিং",
        summary: "অবজেক্ট তৈরির মুহূর্তে স্টেট ভ্যালিডেশন ও কনস্ট্রাক্টরের আন্তঃসংযোগ।",
        explanation: `কনস্ট্রাক্টর হলো ক্লাসের একটি বিশেষ মেথড যা অবজেক্ট তৈরির সময় স্বয়ংক্রিয়ভাবে রান হয়।

### ১. কনস্ট্রাক্টরের মূল শর্তসমূহ
- এর নাম ক্লাসের নামের হুবহু এক হতে হবে।
- কোনো রিটার্ন টাইপ থাকবে না (এমনকি \`void\` ও নয়)।
- ডিফল্ট কনস্ট্রাক্টর জাভা নিজে দেয়, তবে প্রোগ্রামার কোনো প্যারামিটারাইজড কনস্ট্রাক্টর লিখলে ডিফল্টটি মুছে যায়।

---

### ২. 'this' কিওয়ার্ডের দ্বৈত ভূমিকা
1. **ভ্যারিয়েবল শ্যাডোয়িং দূরীকরণ:**
   \`\`\`java
   this.salary = salary;
   \`\`\`
   এখানে \`this.salary\` নির্দেশ করে অবজেক্টের মূল ইনস্ট্যান্স ভেরিয়েবলকে, আর ডানের \`salary\` হলো প্যারামিটার।
2. **কনস্ট্রাক্টর চেইনিং (\`this(...)\`):**
   একটি কনস্ট্রাক্টরের ভেতর থেকে একই ক্লাসের অন্য কোনো কনস্ট্রাক্টর কল করতে \`this(...)\` ব্যবহার করা হয়। এর ফলে কোডের পুনরাবৃত্তি (DRY) সম্পূর্ণ দূর হয়। এই কলটি অবশ্যই কনস্ট্রাক্টরের প্রথম লাইনে হতে হবে।`,
        codeExample: `class Product {
    private String id;
    private String title;
    private double price;
    
    // কনস্ট্রাক্টর ১: ডিফল্ট ফলব্যাক
    public Product() {
        this("PROD-000", "Unknown Product", 0.0); // চেইনিং
    }
    
    // কনস্ট্রাক্টর ২: আংশিক তথ্য
    public Product(String id, String title) {
        this(id, title, 100.0); // চেইনিং
    }
    
    // কনস্ট্রাক্টর ৩: পূর্ণাঙ্গ তথ্য
    public Product(String id, String title, double price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
    
    public void display() {
        System.out.printf("ID: %-10s | Product: %-15s | Price: BDT %.2f %n", id, title, price);
    }
}

public class Main {
    public static void main(String[] args) {
        Product p1 = new Product();
        Product p2 = new Product("P-101", "Mechanical Keyboard");
        Product p3 = new Product("P-102", "Gaming Mouse", 2450.0);
        
        System.out.println("--- Inventory Catalog ---");
        p1.display();
        p2.display();
        p3.display();
    }
}`,
        tips: [
          "`this(...)` স্টেটমেন্টটি কনস্ট্রাক্টরের একদম প্রথম লাইনে থাকতে হবে।",
          "কনস্ট্রাক্টরের মধ্যে ডাটা ভ্যালিডেশন লজিক লিখলে অবৈধ ডাটা দিয়ে কখনোই অবজেক্ট তৈরি হতে পারে না।"
        ],
        commonMistakes: [
          "কনস্ট্রাক্টরের রিটার্ন টাইপ হিসেবে `void` লিখে ফেলা। এতে জাভা এটিকে সাধারণ মেথড ধরে নেবে এবং ইনিশিয়ালাইজেশন ব্যর্থ হবে।",
          "চেইনিং করার সময় চক্রাকার কল (Circular chaining) তৈরি করা (যেমন A কল করে B কে, আর B কল করে A কে), এতে কম্পাইল এরর হবে।"
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Chapter 11: Encapsulation & Access Modifiers",
    bengaliTitle: "অধ্যায় ১১: এনক্যাপসুলেশন ও অ্যাক্সেস মডিফায়ার",
    iconName: "Lock",
    summary:
      "ডাটা হাইডিং ও সুরক্ষার মূল স্তম্ভ হলো এনক্যাপসুলেশন। এই অধ্যায়ে আমরা জাভার ৪টি অ্যাক্সেস মডিফায়ার (private, default, protected, public), গেটার ও সেটার মেথড, বিজনেস লজিক ভ্যালিডেশন এবং ইমিউটেবল ক্লাস আর্কিটেকচার বিস্তারিত শিখব।",
    readingTime: "২৫ মিনিট পাঠ",
    topics: [
      {
        id: "ch11-t1",
        title: "The 4 Access Modifiers in Java",
        bengaliTitle: "জাভার ৪টি অ্যাক্সেস মডিফায়ার ও দৃশ্যমানতার স্তর",
        summary: "private, package-private (default), protected ও public এর পরিধি।",
        explanation: `অ্যাক্সেস মডিফায়ার নির্ধারণ করে কোনো ক্লাস, ভেরিয়েবল বা মেথড অ্যাপ্লিকেশনের কোথা থেকে অ্যাক্সেস করা যাবে।

### ১. চারটি মডিফায়ারের বিস্তারিত স্তর
1. **private (সর্বোচ্চ গোপনীয়):**
   শুধুমাত্র যে ক্লাসের ভেতর লেখা হয়েছে, ঠিক সেই ক্লাসের মেথড থেকেই অ্যাক্সেসযোগ্য। বাইরের কোনো ক্লাস এমনকি সাবক্লাসও দেখতে পারে না।
2. **Default বা Package-Private (কোনো কিওয়ার্ড না দিলে):**
   শুধুমাত্র একই প্যাকেজ বা ফোল্ডারের মধ্যকার ক্লাসগুলো অ্যাক্সেস করতে পারে। অন্য প্যাকেজ থেকে অ্যাক্সেস করা যায় না।
3. **protected (উত্তরাধিকার সূত্রে প্রাপ্ত):**
   একই প্যাকেজের সকল ক্লাস এবং ভিন্ন প্যাকেজে অবস্থিত সাব-ক্লাসগুলো (\`extends\` এর মাধ্যমে) অ্যাক্সেস করতে পারে।
4. **public (সর্বজনীন):**
   পুরো অ্যাপ্লিকেশনের যেকোনো প্যাকেজ বা ক্লাস থেকে নির্দ্বিধায় অ্যাক্সেসযোগ্য।

---

### অ্যাক্সেস ম্যাট্রিক্স টেবিল
| মডিফায়ার | একই ক্লাস | একই প্যাকেজ | ভিন্ন প্যাকেজের সাবক্লাস | বহির্বিশ্ব (যেকোনো প্যাকেজ) |
|---|---|---|---|---|
| **private** | হ্যাঁ | না | না | না |
| **default** | হ্যাঁ | হ্যাঁ | না | না |
| **protected** | হ্যাঁ | হ্যাঁ | হ্যাঁ | না |
| **public** | হ্যাঁ | হ্যাঁ | হ্যাঁ | হ্যাঁ |`,
        codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("=========================================================================");
        System.out.printf("%-12s | %-12s | %-14s | %-14s | %-10s %n", 
            "Modifier", "Same Class", "Same Package", "Subclass(diff)", "World(All)");
        System.out.println("=========================================================================");
        System.out.printf("%-12s | %-12s | %-14s | %-14s | %-10s %n", "private", "YES", "NO", "NO", "NO");
        System.out.printf("%-12s | %-12s | %-14s | %-14s | %-10s %n", "default", "YES", "YES", "NO", "NO");
        System.out.printf("%-12s | %-12s | %-14s | %-14s | %-10s %n", "protected", "YES", "YES", "YES", "NO");
        System.out.printf("%-12s | %-12s | %-14s | %-14s | %-10s %n", "public", "YES", "YES", "YES", "YES");
        System.out.println("=========================================================================");
    }
}`,
        tips: [
          "সর্বনিম্ন প্রিভিলেজ নীতি (Principle of Least Privilege): ফিল্ডগুলোকে সর্বদা `private` রাখুন এবং মেথডগুলোকে কেবল প্রয়োজনে `public` করুন।",
          "একটি `.java` সোর্স ফাইলে কেবল একটি মাত্র `public` ক্লাস থাকতে পারে।"
        ],
        commonMistakes: [
          "ক্লাসের ফিল্ডগুলোকে সরাসরি `public` করে দেওয়া, যার ফলে যে কেউ ক্লাসের বাইরের কোড থেকে অবৈধ মান বসিয়ে দিতে পারে।",
          "প্যাকেজ-প্রাইভেট (ডিফল্ট) এবং প্রোটেক্টেডের মধ্যে পার্থক্য বুঝতে ভুল করা।"
        ]
      },
      {
        id: "ch11-t2",
        title: "Encapsulation, Getters/Setters & Data Validation",
        bengaliTitle: "এনক্যাপসুলেশন ও বিজনেস লজিক ভ্যালিডেশন",
        summary: "ডাটা হাইডিং ও গেটার-সেটারের মাধ্যমে সুরক্ষিত লেনদেন নিশ্চিতকরণ।",
        explanation: `**এনক্যাপসুলেশন (Encapsulation)** হলো ডাটা (ফিল্ড) এবং সেই ডাটার ওপর কাজ করা ফাংশনগুলোকে (মেথড) একটি একক ক্যাপসুলের মধ্যে বেঁধে রাখা এবং বাইরের অননুমোদিত অ্যাক্সেস থেকে ডাটায় সরাসরি হস্তক্ষেপ প্রতিরোধ করা।

### ১. কীভাবে এনক্যাপসুলেশন অর্জন করা হয়?
1. ক্লাসের ফিল্ডগুলোকে \`private\` ডিক্লেয়ার করা।
2. পাবলিক গেটার (\`getter\`) ও সেটার (\`setter\`) মেথড সরবরাহ করা।
3. সেটার মেথডের ভেতরে কঠোর ব্যবসায়িক ভ্যালিডেশন শর্ত প্রয়োগ করা।

### ২. এনক্যাপসুলেশনের সুফল
- বাইরের কোনো ক্লাস সরাসরি আপনার ভেরিয়েবলের মান পরিবর্তন করতে পারে না।
- কেউ যদি নেগেটিভ ব্যালেন্স বা ভুল বয়স বসাতে চায়, সেটার মেথড তা তৎক্ষণাৎ আটকে দিতে পারে।
- রিড-অনলি (Read-only) ক্লাস বানাতে চাইলে কেবল গেটার মেথড রাখা হয়, কোনো সেটার মেথড রাখা হয় না।`,
        codeExample: `class SecureBankAccount {
    private final String accountNumber; // শুধু পঠনযোগ্য
    private double balance;             // নিয়ন্ত্রিত সেটার দ্বারা সংরক্ষিত
    
    public SecureBankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = Math.max(0.0, initialBalance);
    }
    
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public double getBalance() {
        return balance;
    }
    
    // সুরক্ষিত ডিপোজিট মেথড
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            System.out.printf("Success: Deposited BDT %.2f. Current Balance: BDT %.2f %n", amount, balance);
        } else {
            System.out.println("Rejected: Deposit amount must be greater than 0!");
        }
    }
    
    // সুরক্ষিত উত্তোলন মেথড
    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Rejected: Withdrawal amount must be positive!");
        } else if (amount > balance) {
            System.out.println("Rejected: Insufficient balance in account!");
        } else {
            this.balance -= amount;
            System.out.printf("Success: Withdrawn BDT %.2f. Remaining Balance: BDT %.2f %n", amount, balance);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        SecureBankAccount acc = new SecureBankAccount("BD-ACC-4040", 5000.0);
        
        acc.deposit(2000.0);
        acc.deposit(-500.0); // সেটার দ্বারা অবৈধ মান প্রতিরোধ
        acc.withdraw(10000.0); // ওভারড্রাফট প্রতিরোধ
        acc.withdraw(3000.0); // সফল ট্রানজ্যাকশন
        
        System.out.println("Final Verified Balance: BDT " + acc.getBalance());
    }
}`,
        tips: [
          "বুলিয়ান ফিল্ডের জন্য গেটারের নাম `get` এর বদলে `is` বা `has` দিয়ে শুরু করা স্ট্যান্ডার্ড (যেমন: `isActive()`, `hasAccess()`)।",
          "ক্লাসের ফিল্ড পরিবর্তন না করার নিশ্চয়তা দিতে `final` কিওয়ার্ড ব্যবহার করুন।"
        ],
        commonMistakes: [
          "ফিল্ডগুলোকে প্রাইভেট করেও কোনো ভ্যালিডেশন ছাড়া গতানুগতিক গেটার ও সেটার বসিয়ে দেওয়া, যা এনক্যাপসুলেশনের মূল উদ্দেশ্য ব্যাহত করে।",
          "মিউটেবল অবজেক্টের গেটারে সরাসরি রেফারেন্স রিটার্ন করা (ফলে বাইরের কোড থেকে ফিল্ড বদলে যেতে পারে); ডিফেন্সিভ কপি রিটার্ন করা নিরাপদ।"
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Chapter 12: Inheritance & Polymorphism",
    bengaliTitle: "অধ্যায় ১২: ইনহেরিটেন্স ও রানটাইম পলিমরফিজম",
    iconName: "GitMerge",
    summary:
      "কোড পুনঃব্যবহারযোগ্যতা ও সম্প্রসারণযোগ্যতার জাদুকরী ভিত্তি হলো ইনহেরিটেন্স ও পলিমরফিজম। এই অধ্যায়ে আমরা 'extends' কিওয়ার্ড, IS-A সম্পর্ক, 'super' কিওয়ার্ড, মেথড ওভাররাইডিং, এবং ডাইনামিক মেথড ডিসপ্যাচ (Dynamic Method Dispatch) বিস্তারিত শিখব।",
    readingTime: "২৭ মিনিট পাঠ",
    topics: [
      {
        id: "ch12-t1",
        title: "Inheritance via 'extends' & The 'super' Keyword",
        bengaliTitle: "ইনহেরিটেন্স, 'extends' ও 'super' কিওয়ার্ড",
        summary: "প্যারেন্ট ক্লাসের বৈশিষ্ট্য চাইল্ড ক্লাসে উত্তরাধিকার সূত্রে লাভ।",
        explanation: `ইনহেরিটেন্স (Inheritance) হলো এমন একটি ব্যবস্থা যার মাধ্যমে একটি নতুন ক্লাস (Child/Subclass) অন্য একটি বিদ্যমান ক্লাসের (Parent/Superclass) ফিল্ড ও মেথডসমূহ উত্তরাধিকার সূত্রে লাভ করে।

### ১. ইনহেরিটেন্সের মূল সুবিধা
1. **কোড পুনর্ব্যবহার (Code Reusability):** সাধারণ সাধারণ কোডগুলো একবার প্যারেন্ট ক্লাসে লিখে রাখলে সকল চাইল্ড ক্লাস তা স্বয়ংক্রিয়ভাবে পেয়ে যায়।
2. **বাস্তব IS-A সম্পর্ক:** যেমন \`Car IS-A Vehicle\`, \`Programmer IS-A Employee\`। জাভায় \`extends\` কিওয়ার্ডের মাধ্যমে ইনহেরিটেন্স করা হয়।

---

### ২. 'super' কিওয়ার্ডের তিনটি প্রধান প্রয়োগ
- **\`super(...)\`:** চাইল্ড ক্লাসের কনস্ট্রাক্টরের প্রথম লাইন থেকে প্যারেন্ট ক্লাসের কনস্ট্রাক্টর কল করা।
- **\`super.methodName()\`:** চাইল্ড ক্লাসে মেথড ওভাররাইড থাকা সত্ত্বেও প্যারেন্ট ক্লাসের মূল মেথডটিকে কল করা।
- **\`super.variableName\`:** প্যারেন্ট ক্লাসের কোনো ফিল্ডকে বিশেষভাবে অ্যাক্সেস করা।

---

### ৩. মাল্টিপল ইনহেরিটেন্স ও ডায়মন্ড প্রবলেম (The Diamond Problem)
জাভায় একটি ক্লাস কখনোই একসাথে একাধিক ক্লাসকে \`extends\` করতে পারে না (অর্থাৎ ক্লাসের ক্ষেত্রে Multiple Inheritance নিষিদ্ধ)।
কারণ দুটি প্যারেন্ট ক্লাসে যদি একই নামের মেথড থাকে, তবে চাইল্ড ক্লাসে কোনটি এক্সিকিউট হবে তা নিয়ে দ্বন্দ্ব তৈরি হয় (Diamond Problem)। এই সমস্যা এড়াতে জাভা **ইন্টারফেস (Interface)** ব্যবহার করে।`,
        codeExample: `// প্যারেন্ট ক্লাস
class Vehicle {
    protected String brand;
    protected int topSpeed;
    
    public Vehicle(String brand, int topSpeed) {
        this.brand = brand;
        this.topSpeed = topSpeed;
    }
    
    public void displaySpecs() {
        System.out.printf("Vehicle Brand: %-15s | Top Speed: %d km/h %n", brand, topSpeed);
    }
}

// চাইল্ড ক্লাস (Vehicle কে ইনহেরিট করছে)
class ElectricVehicle extends Vehicle {
    private int batteryKwh;
    
    public ElectricVehicle(String brand, int topSpeed, int batteryKwh) {
        super(brand, topSpeed); // প্যারেন্ট ক্লাসের কনস্ট্রাক্টর কল
        this.batteryKwh = batteryKwh;
    }
    
    public void displayElectricSpecs() {
        super.displaySpecs(); // প্যারেন্ট ক্লাসের মেথড পুনঃব্যবহার
        System.out.println("Battery Capacity : " + batteryKwh + " kWh Lithium-ion Pack");
    }
}

public class Main {
    public static void main(String[] args) {
        ElectricVehicle ev = new ElectricVehicle("Tesla Model 3", 225, 75);
        System.out.println("--- Electric Vehicle Details ---");
        ev.displayElectricSpecs();
    }
}`,
        tips: [
          "চাইল্ড ক্লাসের কনস্ট্রাক্টরে আপনি যদি `super()` না লেখেন, তবে জাভা কম্পাইলার নিজে থেকে প্যারেন্টের নো-আর্গুমেন্ট `super()` কল করে।",
          "প্যারেন্টের যেসব ফিল্ড শুধুমাত্র চাইল্ড ক্লাসে উন্মুক্ত করতে চান সেগুলোকে `protected` রাখুন।"
        ],
        commonMistakes: [
          "`super(...)` স্টেটমেন্টকে কনস্ট্রাক্টরের প্রথম লাইনের নিচে লেখা (অবশ্যই প্রথম লাইনে হতে হবে)।",
          "প্যারেন্ট ক্লাসে শুধুমাত্র প্যারামিটারাইজড কনস্ট্রাক্টর থাকলে চাইল্ড ক্লাসে বাধ্যতামূলকভাবে `super(...)` কল না করা।"
        ]
      },
      {
        id: "ch12-t2",
        title: "Runtime Polymorphism & Method Overriding",
        bengaliTitle: "মেথড ওভাররাইডিং ও রানটাইম পলিমরফিজম",
        summary: "একই মেথড কলের বহুবিধ আচরণ এবং ডাইনামিক মেথড ডিসপ্যাচ।",
        explanation: `**পলিমরফিজম (Polymorphism)** শব্দের অর্থ হলো "বহুরূপিতা" (Many Forms)। একই ইন্টারফেস বা মেথড কলের মাধ্যমে ভিন্ন ভিন্ন ধরনের অবজেক্টের নিজস্ব আচরণ প্রদর্শন করার ক্ষমতাকে পলিমরফিজম বলে।

### ১. মেথড ওভাররাইডিং (Method Overriding)
যখন চাইল্ড ক্লাসে প্যারেন্ট ক্লাসের মতো হুবহু একই নাম, একই রিটার্ন টাইপ এবং একই প্যারামিটার বিশিষ্ট কোনো মেথড পুনরায় নতুন লজিক সহ লেখা হয়, তখন তাকে **মেথড ওভাররাইডিং** বলে।

### ২. ডাইনামিক মেথড ডিসপ্যাচ (Dynamic Method Dispatch - DMD)
এটি জাভার সবচেয়ে শক্তিশালী বৈশিষ্ট্যগুলোর একটি:
\`\`\`java
PaymentProcessor p = new BkashPayment();
p.processPayment(500);
\`\`\`
এখানে ভেরিয়েবলের টাইপ হলো প্যারেন্ট (\`PaymentProcessor\`), কিন্তু মেমরিতে আসল অবজেক্ট তৈরি হয়েছে চাইল্ডের (\`BkashPayment\`)।
যখন \`p.processPayment()\` কল হয়, কম্পাইলার জানে না কোন মেথড চলবে। প্রোগ্রাম চলার সময় (Runtime-এ) জেভিএম হিপ মেমরির আসল অবজেক্টটির দিকে তাকায় এবং দেখে অবজেক্টটি \`BkashPayment\`-এর, তাই সে \`BkashPayment\`-এর ওভাররাইডেড মেথডটিই চালায়!`,
        codeExample: `// প্যারেন্ট ক্লাস
class PaymentMethod {
    public void pay(double amount) {
        System.out.printf("Processing generic payment: BDT %.2f %n", amount);
    }
}

// চাইল্ড ১
class Bkash extends PaymentMethod {
    @Override
    public void pay(double amount) {
        System.out.printf("bKash Gateway: Paid BDT %.2f after verifying OTP & PIN.%n", amount);
    }
}

// চাইল্ড ২
class Nagad extends PaymentMethod {
    @Override
    public void pay(double amount) {
        System.out.printf("Nagad Gateway: Successfully paid BDT %.2f via digital transaction.%n", amount);
    }
}

public class Main {
    public static void main(String[] args) {
        // পলিমরফিক অ্যারে: প্যারেন্ট টাইপের রেফারেন্সে বিভিন্ন চাইল্ড অবজেক্ট
        PaymentMethod[] paymentList = {
            new Bkash(),
            new Nagad(),
            new PaymentMethod()
        };
        
        System.out.println("--- Polymorphic Payment Dispatch Pipeline ---");
        for (PaymentMethod method : paymentList) {
            method.pay(1250.0); // রানটাইমে অবজেক্ট দেখে সঠিক মেথড স্বয়ংক্রিয়ভাবে বেছে নেবে
        }
    }
}`,
        tips: [
          "ওভাররাইড করার সময় মেথডের ওপর `@Override` অ্যানোটেশন ব্যবহার করুন; এতে বানান বা প্যারামিটারে ভুল হলে কম্পাইলার সাথে সাথে ধরিয়ে দেবে।",
          "কোনো মেথডকে যাতে চাইল্ড ক্লাস ওভাররাইড করতে না পারে, তার আগে `final` কিওয়ার্ড যোগ করুন।"
        ],
        commonMistakes: [
          "স্ট্যাটিক মেথড ওভাররাইড করার চেষ্টা করা; জাভায় স্ট্যাটিক মেথড কখনো ওভাররাইড হয় না (একে Method Hiding বলে)।",
          "ওভাররাইড করার সময় অ্যাক্সেস স্কোপ কমিয়ে দেওয়া (যেমন প্যারেন্টে `public` থাকলে চাইল্ডে `protected` করা যাবে না)।"
        ]
      }
    ]
  }
];
