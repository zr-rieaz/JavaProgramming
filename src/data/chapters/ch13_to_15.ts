import { Chapter } from "../../types";

export const ch13_to_15_chapters: Chapter[] = [
  {
    id: 13,
    title: "Chapter 13: Abstraction & Interfaces",
    bengaliTitle: "অধ্যায় ১৩: অ্যাবস্ট্রাকশন ও ইন্টারফেস আর্কিটেকচার",
    iconName: "Shield",
    summary:
      "জটিল সফটওয়্যারের অভ্যন্তরীণ বাস্তবায়ন লুকিয়ে রেখে বাহ্যিক সহজ চুক্তি (Contract) উপহার দেওয়ার নামই অ্যাবস্ট্রাকশন। এই অধ্যায়ে আমরা অ্যাবস্ট্রাক্ট ক্লাস বনাম ইন্টারফেসের পার্থক্য, মাল্টিপল ইন্টারফেস বাস্তবায়ন, লুজ কাপলিং (Loose Coupling), এবং আধুনিক জাভার ডিফল্ট ও স্ট্যাটিক মেথড বিস্তারিত বইয়ের মতো শিখব।",
    readingTime: "২৬ মিনিট পাঠ",
    topics: [
      {
        id: "ch13-t1",
        title: "Abstract Classes vs Interfaces",
        bengaliTitle: "অ্যাবস্ট্রাক্ট ক্লাস বনাম ইন্টারফেস ও চুক্তিবদ্ধ ডিজাইন",
        summary: "বাস্তবায়নের জটিলতা আড়াল করে কেবল আচরণ সংজ্ঞায়িত করার কৌশল।",
        explanation: `বাস্তব জীবনে আপনি যখন গাড়ির ব্রেক চাপেন, তখন ব্রেক প্যাডেলের ভেতরে হাইড্রোলিক ফ্লুইড কীভাবে প্রবাহিত হচ্ছে তা আপনার জানার প্রয়োজন নেই—আপনি কেবল জানেন ব্রেক চাপলে গাড়ি থামবে। এটাই **অ্যাবস্ট্রাকশন (Abstraction)**।

### ১. অ্যাবস্ট্রাক্ট ক্লাস (Abstract Class)
- যে ক্লাসের আগে \`abstract\` কিওয়ার্ড থাকে।
- এর সরাসরি কোনো অবজেক্ট তৈরি করা যায় না (\`new Animal()\` নিষিদ্ধ)।
- এতে সাধারণ কনক্রিট মেথড (যার বডি আছে) এবং অ্যাবস্ট্রাক্ট মেথড (যার কোনো বডি নেই) উভয়ই থাকতে পারে।
- এটি অংশবিশেষ বাস্তবায়িত (Partial Implementation) ভিত্তি ক্লাস হিসেবে ব্যবহৃত হয়।

---

### ২. ইন্টারফেস (Interface): ১০০% নিখুঁত চুক্তি
- ইন্টারফেস হলো এমন একটি প্রটোকল বা কনট্রাক্ট যা ক্লাসের আচরণ নির্দেশ করে।
- এতে সাধারণত শুধুমাত্র মেথডের প্রোটোটাইপ থাকে; কোনো স্টেট বা ইনস্ট্যান্স ভেরিয়েবল থাকে না (ভেরিয়েবল থাকলে তা বাই-ডিফল্ট \`public static final\` কনস্ট্যান্ট হয়)।
- একটি ক্লাস চাইলে একসাথে একাধিক ইন্টারফেসকে বাস্তবায়ন (\`implements InterfaceA, InterfaceB\`) করতে পারে, যার মাধ্যমে জাভায় মাল্টিপল ইনহেরিটেন্সের পূর্ণ সুবিধা পাওয়া যায়।
- জাভা ৮ সংস্করণ থেকে ইন্টারফেসে কোড সহ \`default\` মেথড এবং \`static\` মেথড লেখার অনুমতি দেওয়া হয়েছে।`,
        codeExample: `// ১. ইন্টারফেস চুক্তি
interface PaymentGateway {
    void processPayment(double amount); // বাই-ডিফল্ট public abstract
    
    // জাভা ৮+ ডিফল্ট মেথড (অপশনাল ইউটিলিটি)
    default void generateReceipt(double amount) {
        System.out.println("Receipt Generated: Successfully received BDT " + amount);
    }
}

// ২. বিকাশ বাস্তবায়ন
class BkashGateway implements PaymentGateway {
    @Override
    public void processPayment(double amount) {
        System.out.printf("bKash API: Charged BDT %.2f successfully.%n", amount);
    }
}

// ৩. ক্রেডিট কার্ড বাস্তবায়ন
class CardGateway implements PaymentGateway {
    @Override
    public void processPayment(double amount) {
        System.out.printf("Visa Card Gateway: BDT %.2f processing via secure gateway.%n", amount);
    }
}

public class Main {
    public static void main(String[] args) {
        // লুজ কাপলিং: ইন্টারফেস টাইপের রেফারেন্সে যেকোনো বাস্তবায়ন বসানো যায়
        PaymentGateway gateway = new BkashGateway();
        gateway.processPayment(1500.0);
        gateway.generateReceipt(1500.0);
        
        System.out.println("----------------------------------------------");
        gateway = new CardGateway();
        gateway.processPayment(8200.0);
        gateway.generateReceipt(8200.0);
    }
}`,
        tips: [
          "ইন্টারফেসের নাম সাধারণত অ্যাডজেক্টিভ বা অ্যাকশন ধর্মী হয় (যেমন: `Runnable`, `Comparable`, `PaymentGateway`)।",
          "উচ্চমানের সফটওয়্যার আর্কিটেকচারে ক্লাসের সরাসরি বাস্তবায়নের ওপর নির্ভর না করে ইন্টারফেসের ওপর নির্ভর করুন (Program to an interface, not an implementation)।"
        ],
        commonMistakes: [
          "অ্যাবস্ট্রাক্ট ক্লাস বা ইন্টারফেসের ইনস্ট্যান্স তৈরি করার চেষ্টা করা (`new PaymentGateway()`)।",
          "ইন্টারফেসের মেথডকে ক্লাসে ওভাররাইড করার সময় `public` কিওয়ার্ড না দেওয়া।"
        ]
      }
    ]
  },
  {
    id: 14,
    title: "Chapter 14: Exception Handling & Robust Systems",
    bengaliTitle: "অধ্যায় ১৪: এক্সেপশন হ্যান্ডলিং ও রোবাস্ট সিস্টেম আর্কিটেকচার",
    iconName: "AlertTriangle",
    summary:
      "প্রোগ্রামে ত্রুটি বা অপ্রত্যাশিত ঘটনা ঘটলেও অ্যাপ্লিকেশন যাতে ক্র্যাশ না করে মসৃণভাবে চালু থাকে তা নিশ্চিত করাই এক্সেপশন হ্যান্ডলিংয়ের লক্ষ্য। এই অধ্যায়ে আমরা Checked বনাম Unchecked Exceptions, try-catch-finally ব্লক, throw ও throws, কাস্টম এক্সেপশন এবং try-with-resources বিস্তারিত শিখব।",
    readingTime: "২৭ মিনিট পাঠ",
    topics: [
      {
        id: "ch14-t1",
        title: "Checked vs Unchecked Exceptions & Safe Blocks",
        bengaliTitle: "চেকড বনাম আনচেকড এক্সেপশন ও Try-Catch-Finally",
        summary: "সফটওয়্যারের অপ্রত্যাশিত বিপর্যয় মোকাবেলা ও মেমরি লিকেজ প্রতিরোধ।",
        explanation: `এক্সেপশন (Exception) হলো এমন একটি অপ্রত্যাশিত ঘটনা যা প্রোগ্রাম চলাকালীন স্বাভাবিক এক্সিকিউশন ফ্লোকে ব্যাহত করে।

### ১. জাভা এক্সেপশন হায়ারার্কি
- **Throwable:** সমস্ত ত্রুটির মূল প্যারেন্ট ক্লাস।
  - **Error:** সিস্টেম-লেভেল বিপর্যয় যা প্রোগ্রামারের নিয়ন্ত্রণে থাকে না (যেমন: \`OutOfMemoryError\`, \`StackOverflowError\`)। এগুলো রিকভার করা যায় না।
  - **Exception:** অ্যাপ্লিকেশনের ত্রুটি যা কোডের মাধ্যমে সুন্দরভাবে সামলানো (Handle) সম্ভব।

---

### ২. চেকড বনাম আনচেকড এক্সেপশন
1. **চেকড এক্সেপশন (Checked Exceptions):**
   কম্পাইল-টাইমেই জাভা কম্পাইলার নিশ্চিত হতে চায় যে আপনি এটি হ্যান্ডেল করেছেন কিনা (যেমন: ফাইল না পাওয়া \`FileNotFoundException\`, নেটওয়ার্ক সমস্যা \`IOException\`)। \`try-catch\` বা \`throws\` না দিলে কোড কম্পাইলই হবে না।
2. **আনচেকড এক্সেপশন (Unchecked / Runtime Exceptions):**
   প্রোগ্রামারের লজিক্যাল ভুলের কারণে ঘটে (যেমন: শূন্য দিয়ে ভাগ করা \`ArithmeticException\`, নাল অবজেক্টে মেথড কল করা \`NullPointerException\`, সীমার বাইরে অ্যারে রিড করা \`ArrayIndexOutOfBoundsException\`)।

---

### ৩. Try-Catch-Finally ও Try-with-resources
- \`try\`: ঝুঁকিপূর্ণ কোড যার মধ্যে ত্রুটি হতে পারে।
- \`catch\`: ত্রুটি ঘটলে কী ব্যবস্থা নেওয়া হবে।
- \`finally\`: এক্সেপশন হোক বা না হোক, এই ব্লক সব সময় চলবেই (ডাটাবেজ কানেকশন বা ফাইল ক্লোজ করার জন্য আদর্শ)।`,
        codeExample: `public class Main {
    public static void main(String[] args) {
        int numerator = 100;
        int denominator = 0;
        
        System.out.println("--- Secure Arithmetic Operation Start ---");
        try {
            System.out.println("Attempting division operation...");
            int outcome = numerator / denominator; // ArithmeticException তৈরি করবে
            System.out.println("Result: " + outcome);
        } catch (ArithmeticException ex) {
            System.err.println("Warning: Integer division by zero is undefined in mathematics!");
            System.err.println("JVM Message: " + ex.getMessage());
        } finally {
            System.out.println("Finally Block: System resources successfully released.");
        }
        
        System.out.println("Application continues running smoothly without crashing!");
    }
}`,
        tips: [
          "জাভা ৭ থেকে ফাইল বা ডাটাবেজ ক্লোজ করতে সাধারণ finally এর বদলে `try-with-resources` ব্যবহার করুন; এতে অটো-ক্লোজ সম্পন্ন হয়।",
          "এক্সেপশন হ্যান্ডলিংয়ে কখনো খালি ক্যাচ ব্লক (`catch (Exception e) {}`) রাখবেন না, কারণ এতে নীরব ব্যর্থতা (Silent Failure) ঘটে এবং বাগ ধরা যায় না।"
        ],
        commonMistakes: [
          "স্পেসিফিক এক্সেপশনের আগে জেনেরিক `catch (Exception e)` লেখা; সবসময় নির্দিষ্ট ক্যাচ ব্লক আগে এবং জেনেরিক ক্যাচ ব্লক সবার শেষে লিখতে হয়।",
          "কন্ট্রোল ফ্লো লজিক পরিচালনার উদ্দেশ্যে সাধারণ `if-else` এর বদলে ভুলভাবে এক্সেপশন হ্যান্ডলিং ব্যবহার করা।"
        ]
      }
    ]
  },
  {
    id: 15,
    title: "Chapter 15: Java Collections Framework & Core Algorithms",
    bengaliTitle: "অধ্যায় ১৫: জাভা কালেকশন ফ্রেমওয়ার্ক ও ডাটা স্ট্রাকচার",
    iconName: "FolderGit2",
    summary:
      "বাস্তব জীবনের জটিল ডাটা সংরক্ষণ ও প্রসেসিংয়ে সাধারণ অ্যারের সীমাবদ্ধতা দূর করে জাভা কালেকশনস ফ্রেমওয়ার্ক। এই অধ্যায়ে আমরা ArrayList, HashSet, HashMap, কী-ভ্যালু হ্যাশিং প্রক্রিয়া এবং অ্যালগরিদমিক সার্চিং (Linear vs Binary Search) বিস্তারিত বইয়ের মতো শিখব।",
    readingTime: "২৮ মিনিট পাঠ",
    topics: [
      {
        id: "ch15-t1",
        title: "ArrayList, HashSet & HashMap Mastery",
        bengaliTitle: "ArrayList, HashSet এবং HashMap এর মেমরি আর্কিটেকচার",
        summary: "ডাইনামিক ডাটা ধারণ, ডুপ্লিকেট ফিল্টারিং ও হ্যাশম্যাপের O(1) লুকআপ।",
        explanation: `**জাভা কালেকশনস ফ্রেমওয়ার্ক (Java Collections Framework - JCF)** হলো অবজেক্টের গ্রুপকে পরিচালনা করার জন্য প্রস্তুতকৃত ক্লাসের সমৃদ্ধ সেট।

### ১. অ্যারেলিস্ট (ArrayList) - পরিবর্তনশীল অ্যারে
- সাধারণ অ্যারের সাইজ স্থির, কিন্তু \`ArrayList\` স্বয়ংক্রিয়ভাবে তার আকার বৃদ্ধি (Resizing) করে।
- ইনডেক্স ভিত্তিক র্যান্ডম অ্যাক্সেসের টাইম কমপ্লেক্সিটি $O(1)$।
- এতে ডুপ্লিকেট মান সংরক্ষণ করা যায়।

---

### ২. হ্যাশসেট (HashSet) - অনন্য উপাদানের সংগ্রহ
- এতে কোনো ডুপ্লিকেট উপাদান রাখা যায় না। ডুপ্লিকেট ঢোকাতে গেলে তা বাতিল হয়।
- উপাদানের কোনো ক্রম (Order) নিশ্চিত করে না।
- হ্যাশিং মেকানিজমের কারণে উপাদান খুঁজতে গড়ে মাত্র $O(1)$ সময় লাগে।

---

### ৩. হ্যাশম্যাপ (HashMap<K, V>) - কী-ভ্যালু পেয়ার
- বাস্তব জীবনের সবচেয়ে জনপ্রিয় ডাটা স্ট্রাকচার। এটি জোড়ায় জোড়ায় (Key এবং Value) ডাটা রাখে।
- কী (Key) অবশ্যই অনন্য হতে হবে, তবে ভ্যালু ডুপ্লিকেট হতে পারে।
- যেকোনো আইডির বিপরীতে তথ্য খুঁজতে বা ক্যাশিং করতে এটি অত্যন্ত দ্রুত ($O(1)$)।`,
        codeExample: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        // ১. ডাইনামিক অ্যারেলিস্ট
        List<String> frameworkList = new ArrayList<>();
        frameworkList.add("Spring Boot");
        frameworkList.add("Hibernate");
        frameworkList.add("Quarkus");
        System.out.println("ArrayList Frameworks List : " + frameworkList);
        
        // ২. হ্যাশসেট (স্বয়ংক্রিয় ডুপ্লিকেট ফিল্টারিং)
        Set<Integer> uniqueRollNumbers = new HashSet<>();
        uniqueRollNumbers.add(101);
        uniqueRollNumbers.add(102);
        uniqueRollNumbers.add(101); // ডুপ্লিকেট হওয়ায় প্রত্যাখ্যাত হবে
        System.out.println("HashSet Unique Roll Count : " + uniqueRollNumbers.size());
        
        // ৩. হ্যাশম্যাপ (কী-ভ্যালু ডাটাবেজ)
        Map<String, Integer> productInventory = new HashMap<>();
        productInventory.put("Laptop", 45);
        productInventory.put("Monitor", 120);
        productInventory.put("Keyboard", 85);
        
        System.out.println("Total Monitors in Inventory : " + productInventory.get("Monitor") + " units");
        System.out.println("All Products & Stock Ledger : " + productInventory);
    }
}`,
        tips: [
          "ভেরিয়েবল ডিক্লেয়ার করার সময় প্যারেন্ট ইন্টারফেস ব্যবহার করুন (যেমন: `List<String> list = new ArrayList<>();`)।",
          "কালেকশন ফ্রেমওয়ার্কে প্রিমিটিভ ডাটা টাইপ রাখা যায় না, তাই তাদের র্যাপার ক্লাস (যেমন `int` এর বদলে `Integer`) ব্যবহার করতে হয়।"
        ],
        commonMistakes: [
          "`new ArrayList<int>()` লেখা; প্রিমিটিভ না দিয়ে অবশ্যই `Integer` লিখতে হবে।",
          "হ্যাশম্যাপের কী (Key) হিসেবে কাস্টম অবজেক্ট ব্যবহার করলে `equals()` এবং `hashCode()` মেথড সঠিকভাবে ওভাররাইড না করা।"
        ]
      },
      {
        id: "ch15-t2",
        title: "Searching Algorithms: Linear vs Binary Search",
        bengaliTitle: "সার্চিং অ্যালগরিদম: লিনিয়ার বনাম বাইনারি সার্চ",
        summary: "সিকোয়েনশিয়াল O(N) অনুসন্ধান বনাম ডিভাইড অ্যান্ড কনকোয়ার O(log N) অনুসন্ধান।",
        explanation: `প্রচুর তথ্যের মধ্য থেকে একটি নির্দিষ্ট তথ্য খুঁজে বের করার কৌশলকে সার্চিং বলা হয়।

### ১. লিনিয়ার সার্চ (Linear Search)
- তালিকার প্রথম উপাদান থেকে শুরু করে একে একে প্রতিটি উপাদান কাঙ্ক্ষিত লক্ষ্যের সাথে মিলিয়ে দেখা হয়।
- **সময় জটিলতা (Time Complexity):** $O(n)$।
- সুবিধা: ডাটা সাজানো (Sorted) থাকার কোনো প্রয়োজন নেই।

### ২. বাইনারি সার্চ (Binary Search)
- ডিভাইড অ্যান্ড কনকোয়ার (Divide and Conquer) পদ্ধতিতে প্রতি ধাপে তালিকার অর্ধেক অংশ বাদ দিয়ে অনুসন্ধান করা হয়।
- **বাধ্যতামূলক শর্ত:** ডাটাকে অবশ্যই সাজানো (Sorted) অবস্থায় থাকতে হবে।
- **সময় জটিলতা:** $O(\\log n)$। কোটি উপাদানের মধ্য থেকেও মাত্র ৩০ বারের চেকের মধ্যে উপাদান খুঁজে বের করে!

**ইন্টিজার ওভারফ্লো প্রতিরোধ:**
মধ্যবিন্দু নির্ণয় করতে \`mid = (low + high) / 2\` লিখলে বড় সংখ্যায় মেমরি ওভারফ্লো হতে পারে। তাই নিরাপদ স্ট্যান্ডার্ড হলো:
\`\`\`java
int mid = low + (high - low) / 2;
\`\`\``,
        codeExample: `public class Main {
    // বাইনারি সার্চ মেথড
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2; // ওভারফ্লো নিরাপদ হিসাব
            
            if (arr[mid] == target) {
                return mid; // টার্গেট পাওয়া গেছে
            } else if (arr[mid] < target) {
                low = mid + 1; // ডান ভাগে সন্ধান
            } else {
                high = mid - 1; // বাম ভাগে সন্ধান
            }
        }
        return -1; // টার্গেট ডাটাতে নেই
    }

    public static void main(String[] args) {
        int[] sortedData = {12, 25, 34, 48, 59, 73, 86, 99};
        int target = 59;
        
        int resultIndex = binarySearch(sortedData, target);
        
        if (resultIndex != -1) {
            System.out.printf("Target %d found successfully at index %d!%n", target, resultIndex);
        } else {
            System.out.println("Target not present in dataset.");
        }
    }
}`,
        tips: [
          "বাইনারি সার্চ ব্যবহারের আগে সবসময় নিশ্চিত করুন ডাটা সর্ট করা আছে কিনা। লাগলে `Arrays.sort(arr)` করে নিন।",
          "জাভার বিল্ট-ইন মেথড `Arrays.binarySearch(arr, key)` ব্যবহার করতে পারেন।"
        ],
        commonMistakes: [
          "আনসর্টেড (এলোমেলো) ডাটাতে বাইনারি সার্চ প্রয়োগ করা, যার ফলে ভুল আউটপুট আসবে।",
          "লুপ শর্তে `low < high` লেখা; এটি `low <= high` হতে হবে, অন্যথায় ১ সাইজের অ্যারেতে মিলবে না।"
        ]
      }
    ]
  }
];
