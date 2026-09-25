import { JavaProgram } from "../../types";

export const ch13_to_15_programs: JavaProgram[] = [
  // CHAPTER 13: Java Generics & Modern Features (85-91)
  {
    id: "prog-85",
    title: "Generic Box Class with Type Safety",
    bengaliTitle: "  (Generic Class)",
    chapter: 13,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Generics",
    description: "",
    code: `class Box<T> {
    private T content;
    public void set(T content) {
        this.content = content;
    }
    public T get() {
        return content;
    }
}
public class Main {
    public static void main(String[] args) {
        Box<String> stringBox = new Box<>();
        stringBox.set("Java Generics Mastery");
        System.out.println("String Box Content: " + stringBox.get());
        Box<Integer> intBox = new Box<>();
        intBox.set(2024);
        System.out.println("Integer Box Content: " + intBox.get());
    }
}`,
    expectedOutput: `String Box Content: Java Generics Mastery\nInteger Box Content: 2024`,
    explanation: "",
    keyPoints: ["  Type Erasure"],
    tags: ["generics", "type-safety", "box"],
  },
  {
    id: "prog-86",
    title: "Generic Methods with Bounded Type Parameters",
    bengaliTitle: "  (<T extends Number>)",
    chapter: 13,
    chapterTitle: "",
    difficulty: "advanced",
    category: "Generics",
    description: "",
    code: `public class Main {
    //   Number   (Integer, Double) 
    public static <T extends Number> double square(T value) {
        return value.doubleValue() * value.doubleValue();
    }
    public static void main(String[] args) {
        System.out.println("Square of int 7: " + square(7));
        System.out.println("Square of double 4.5: " + square(4.5));
    }
}`,
    expectedOutput: `Square of int 7: 49.0\nSquare of double 4.5: 20.25`,
    explanation: "<T extends Number>",
    keyPoints: [""],
    tags: ["generics", "bounded-types", "methods"],
  },
  {
    id: "prog-87",
    title: "Java 14+ Record Classes (Data Carrier Objects)",
    bengaliTitle: "  (Java 14+ Record Class)",
    chapter: 13,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Modern Java",
    description: "",
    code: `record User(String username, String role, int points) {
    //   (username()), equals, hashCode   toString 
}
public class Main {
    public static void main(String[] args) {
        User u1 = new User("rieaz_dev", "Lead Architect", 4500);
        System.out.println("User Record: " + u1);
        System.out.println("Username: " + u1.username());
        System.out.println("Points: " + u1.points());
    }
}`,
    expectedOutput: `User Record: User[username=rieaz_dev, role=Lead Architect, points=4500]\nUsername: rieaz_dev\nPoints: 4500`,
    explanation: "  toString",
    keyPoints: ["  private final"],
    tags: ["records", "java14", "modern-java", "dto"],
  },
  {
    id: "prog-88",
    title: "Java 15+ Text Blocks (Multi-line Strings)",
    bengaliTitle: "  (Java 15+ Text Blocks: \"\"\")",
    chapter: 13,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Modern Java",
    description: "  JSON, HTML   SQL",
    code: `public class Main {
    public static void main(String[] args) {
        String jsonPayload = """
        {
            "status": "success",
            "app": "Java Master Pro",
            "version": 17,
            "offlineSupport": true
        }
        """;
        System.out.println("Formatted JSON payload via Text Block:");
        System.out.println(jsonPayload);
    }
}`,
    expectedOutput: `Formatted JSON payload via Text Block:\n{\n    "status": "success",\n    "app": "Java Master Pro",\n    "version": 17,\n    "offlineSupport": true\n}`,
    explanation: "  (\"\"\")",
    keyPoints: [""],
    tags: ["text-blocks", "java15", "strings"],
  },
  {
    id: "prog-89",
    title: "Java 17 Sealed Classes and Interfaces",
    bengaliTitle: "  (Java 17 Sealed Classes: sealed/permits)",
    chapter: 13,
    chapterTitle: "",
    difficulty: "advanced",
    category: "Modern Java",
    description: "",
    code: `//   Car   Truck 
sealed class Vehicle permits Car, Truck {}
final class Car extends Vehicle {
    void drive() { System.out.println("Driving modern electric car."); }
}
final class Truck extends Vehicle {
    void haul() { System.out.println("Hauling heavy cargo load."); }
}
public class Main {
    public static void main(String[] args) {
        Car tesla = new Car();
        tesla.drive();
        Truck volvo = new Truck();
        volvo.haul();
    }
}`,
    expectedOutput: `Driving modern electric car.\nHauling heavy cargo load.`,
    explanation: "sealed   permits",
    keyPoints: ["  final, sealed   non-sealed"],
    tags: ["sealed-classes", "java17", "architecture"],
  },
  {
    id: "prog-90",
    title: "Optional Class to Prevent NullPointerException",
    bengaliTitle: "  (Optional<T> Avoid Null)",
    chapter: 13,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Modern Java",
    description: "",
    code: `import java.util.Optional;
public class Main {
    public static Optional<String> findUserById(int id) {
        if (id == 101) {
            return Optional.of("Tanvir Ahmed");
        }
        return Optional.empty(); // Not found, safe null substitute
    }
    public static void main(String[] args) {
        Optional<String> user1 = findUserById(101);
        Optional<String> user2 = findUserById(999);
        System.out.println("User 101: " + user1.orElse("User not found"));
        System.out.println("User 999: " + user2.orElse("Default Guest User"));
    }
}`,
    expectedOutput: `User 101: Tanvir Ahmed\nUser 999: Default Guest User`,
    explanation: "Optional",
    keyPoints: ["orElse()   orElseGet()"],
    tags: ["optional", "null-safety", "java8"],
  },
  {
    id: "prog-91",
    title: "Stream API - Filter, Map & Reduce",
    bengaliTitle: "  (Stream API: filter, map, reduce)",
    chapter: 13,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Modern Java",
    description: "",
    code: `import java.util.List;
public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        //   ->   -> 
        int sumOfDoubledEvens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * 2)
            .reduce(0, Integer::sum);
        System.out.println("Source Numbers: " + numbers);
        System.out.println("Sum of doubled evens: " + sumOfDoubledEvens);
    }
}`,
    expectedOutput: `Source Numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nSum of doubled evens: 60`,
    explanation: "",
    keyPoints: [""],
    tags: ["streams", "functional-programming", "java8"],
  },
  // CHAPTER 14: Practical Algorithms & Math (92-98)
  {
    id: "prog-92",
    title: "Palindrome String and Number Checker",
    bengaliTitle: "  (Palindrome Checker)",
    chapter: 14,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Algorithms",
    description: "",
    code: `public class Main {
    public static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }
    public static void main(String[] args) {
        String word1 = "racecar";
        String word2 = "madam";
        String word3 = "java";
        System.out.println(word1 + " is palindrome? " + isPalindrome(word1));
        System.out.println(word2 + " is palindrome? " + isPalindrome(word2));
        System.out.println(word3 + " is palindrome? " + isPalindrome(word3));
    }
}`,
    expectedOutput: `racecar is palindrome? true\nmadam is palindrome? true\njava is palindrome? false`,
    explanation: "  O(n)",
    keyPoints: [""],
    tags: ["palindrome", "strings", "algorithms"],
  },
  {
    id: "prog-93",
    title: "Armstrong Number Algorithm",
    bengaliTitle: "  (Armstrong Number)",
    chapter: 14,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Algorithms",
    description: "",
    code: `public class Main {
    public static boolean isArmstrong(int num) {
        int original = num;
        int digits = String.valueOf(num).length();
        int sum = 0;
        while (num > 0) {
            int d = num % 10;
            sum += Math.pow(d, digits);
            num /= 10;
        }
        return sum == original;
    }
    public static void main(String[] args) {
        int test1 = 153; // 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
        int test2 = 9474;
        int test3 = 120;
        System.out.println(test1 + " is Armstrong: " + isArmstrong(test1));
        System.out.println(test2 + " is Armstrong: " + isArmstrong(test2));
        System.out.println(test3 + " is Armstrong: " + isArmstrong(test3));
    }
}`,
    expectedOutput: `153 is Armstrong: true\n9474 is Armstrong: true\n120 is Armstrong: false`,
    explanation: "",
    keyPoints: ["Math.pow()"],
    tags: ["armstrong", "math", "algorithms"],
  },
  {
    id: "prog-94",
    title: "Valid Anagram String Algorithm",
    bengaliTitle: "  (Valid Anagram)",
    chapter: 14,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Algorithms",
    description: "",
    code: `import java.util.Arrays;
public class Main {
    public static boolean isAnagram(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        char[] c1 = s1.toCharArray();
        char[] c2 = s2.toCharArray();
        Arrays.sort(c1);
        Arrays.sort(c2);
        return Arrays.equals(c1, c2);
    }
    public static void main(String[] args) {
        String w1 = "listen", w2 = "silent";
        String w3 = "triangle", w4 = "integral";
        String w5 = "hello", w6 = "world";
        System.out.println("'" + w1 + "' & '" + w2 + "' anagram? " + isAnagram(w1, w2));
        System.out.println("'" + w3 + "' & '" + w4 + "' anagram? " + isAnagram(w3, w4));
        System.out.println("'" + w5 + "' & '" + w6 + "' anagram? " + isAnagram(w5, w6));
    }
}`,
    expectedOutput: `'listen' & 'silent' anagram? true\n'triangle' & 'integral' anagram? true\n'hello' & 'world' anagram? false`,
    explanation: "",
    keyPoints: ["  O(n)"],
    tags: ["anagram", "strings", "sorting"],
  },
  {
    id: "prog-95",
    title: "Selection Sort Algorithm",
    bengaliTitle: "  (Selection Sort Algorithm)",
    chapter: 14,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Algorithms",
    description: "",
    code: `public class Main {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // Swap
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
    public static void main(String[] args) {
        int[] list = {29, 10, 14, 37, 13};
        selectionSort(list);
        System.out.print("Sorted by Selection Sort: ");
        for (int x : list) {
            System.out.print(x + " ");
        }
        System.out.println();
    }
}`,
    expectedOutput: `Sorted by Selection Sort: 10 13 14 29 37 `,
    explanation: "",
    keyPoints: ["  O(n)"],
    tags: ["selection-sort", "algorithms", "sorting"],
  },
  {
    id: "prog-96",
    title: "Insertion Sort Algorithm",
    bengaliTitle: "  (Insertion Sort Algorithm)",
    chapter: 14,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Algorithms",
    description: "",
    code: `public class Main {
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
    public static void main(String[] args) {
        int[] data = {12, 11, 13, 5, 6};
        insertionSort(data);
        System.out.print("Sorted by Insertion Sort: ");
        for (int n : data) {
            System.out.print(n + " ");
        }
        System.out.println();
    }
}`,
    expectedOutput: `Sorted by Insertion Sort: 5 6 11 12 13 `,
    explanation: "  O(n)",
    keyPoints: [""],
    tags: ["insertion-sort", "algorithms", "sorting"],
  },
  {
    id: "prog-97",
    title: "Quick Sort Algorithm (Divide & Conquer)",
    bengaliTitle: "  (Quick Sort: Pivot Partitioning)",
    chapter: 14,
    chapterTitle: "",
    difficulty: "advanced",
    category: "Algorithms",
    description: "",
    code: `public class Main {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
    public static void main(String[] args) {
        int[] arr = {10, 80, 30, 90, 40, 50, 70};
        quickSort(arr, 0, arr.length - 1);
        System.out.print("Sorted by Quick Sort: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
    expectedOutput: `Sorted by Quick Sort: 10 30 40 50 70 80 90 `,
    explanation: "  O(n log n)",
    keyPoints: [""],
    tags: ["quick-sort", "divide-and-conquer", "algorithms"],
  },
  {
    id: "prog-98",
    title: "Sieve of Eratosthenes (Fast Prime Generation)",
    bengaliTitle: "  (Fast Prime Sieve)",
    chapter: 14,
    chapterTitle: "",
    difficulty: "advanced",
    category: "Algorithms",
    description: "",
    code: `import java.util.Arrays;
public class Main {
    public static void sieve(int n) {
        boolean[] isPrime = new boolean[n + 1];
        Arrays.fill(isPrime, true);
        isPrime[0] = false;
        isPrime[1] = false;
        for (int p = 2; p * p <= n; p++) {
            if (isPrime[p]) {
                for (int i = p * p; i <= n; i += p) {
                    isPrime[i] = false;
                }
            }
        }
        System.out.print("Prime numbers up to " + n + ": ");
        for (int i = 2; i <= n; i++) {
            if (isPrime[i]) System.out.print(i + " ");
        }
        System.out.println();
    }
    public static void main(String[] args) {
        sieve(50);
    }
}`,
    expectedOutput: `Prime numbers up to 50: 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 `,
    explanation: "  O(n log log n)",
    keyPoints: [""],
    tags: ["sieve", "prime-numbers", "math", "algorithms"],
  },
  // CHAPTER 15: Mini Projects & Real-World Apps (99-105)
  {
    id: "prog-99",
    title: "Interactive Console Student Gradebook Management",
    bengaliTitle: "",
    chapter: 15,
    chapterTitle: "",
    difficulty: "advanced",
    category: "Projects",
    description: "",
    code: `import java.util.ArrayList;
class StudentRecord {
    String name;
    int roll;
    double gpa;
    public StudentRecord(String name, int roll, double gpa) {
        this.name = name;
        this.roll = roll;
        this.gpa = gpa;
    }
}
public class Main {
    public static void main(String[] args) {
        ArrayList<StudentRecord> registry = new ArrayList<>();
        registry.add(new StudentRecord("Rieaz", 101, 3.92));
        registry.add(new StudentRecord("Sabbir", 102, 3.75));
        registry.add(new StudentRecord("Ayesha", 103, 3.98));
        System.out.println("=================================================");
        System.out.printf("%-8s | %-12s | %-6s | %-10s\n", "Roll", "Name", "GPA", "Status");
        System.out.println("=================================================");
        double totalGpa = 0;
        for (StudentRecord s : registry) {
            String status = s.gpa >= 3.8 ? "Honors" : "Regular";
            System.out.printf("%-8d | %-12s | %-6.2f | %-10s\n", s.roll, s.name, s.gpa, status);
            totalGpa += s.gpa;
        }
        System.out.println("=================================================");
        System.out.printf("Batch Class Average GPA: %.2f\n", (totalGpa / registry.size()));
    }
}`,
    expectedOutput: `=================================================\nRoll     | Name         | GPA    | Status    \n=================================================\n101      | Rieaz        | 3.92   | Honors    \n102      | Sabbir       | 3.75   | Regular   \n103      | Ayesha       | 3.98   | Honors    \n=================================================\nBatch Class Average GPA: 3.88`,
    explanation: "OOP   ArrayList   printf",
    keyPoints: [""],
    tags: ["project", "gradebook", "records"],
  },
  {
    id: "prog-100",
    title: "ATM Banking Simulator with Pin & Transaction History",
    bengaliTitle: "",
    chapter: 15,
    chapterTitle: "",
    difficulty: "advanced",
    category: "Projects",
    description: "",
    code: `import java.util.ArrayList;
public class Main {
    private static double balance = 15000.0;
    private static final int CORRECT_PIN = 4321;
    private static final ArrayList<String> history = new ArrayList<>();
    public static boolean verifyPin(int pin) {
        return pin == CORRECT_PIN;
    }
    public static void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            history.add("Deposited: +$" + amount + " (Balance: $" + balance + ")");
            System.out.println("Successfully deposited: $" + amount);
        }
    }
    public static void withdraw(double amount) {
        if (amount > balance) {
            System.out.println("Transaction Failed: Insufficient balance!");
        } else {
            balance -= amount;
            history.add("Withdrawn: -$" + amount + " (Balance: $" + balance + ")");
            System.out.println("Dispensed cash: $" + amount);
        }
    }
    public static void main(String[] args) {
        System.out.println("=== City Bank Virtual ATM ===");
        if (verifyPin(4321)) {
            System.out.println("Pin verified. Access granted.");
            deposit(2500);
            withdraw(5000);
            withdraw(20000); // Exceeds balance
            System.out.println("\\n--- Mini Statement ---");
            for (String record : history) {
                System.out.println(record);
            }
            System.out.println("Current Available Balance: $" + balance);
        }
    }
}`,
    expectedOutput: `=== City Bank Virtual ATM ===\nPin verified. Access granted.\nSuccessfully deposited: $2500.0\nDispensed cash: $5000.0\nTransaction Failed: Insufficient balance!\n\n--- Mini Statement ---\nDeposited: +$2500.0 (Balance: $17500.0)\nWithdrawn: -$5000.0 (Balance: $12500.0)\nCurrent Available Balance: $12500.0`,
    explanation: "",
    keyPoints: [""],
    tags: ["project", "atm", "banking", "simulation"],
  },
  {
    id: "prog-101",
    title: "E-Commerce Shopping Cart and Tax Engine",
    bengaliTitle: "",
    chapter: 15,
    chapterTitle: "",
    difficulty: "advanced",
    category: "Projects",
    description: "",
    code: `import java.util.ArrayList;
class CartItem {
    String title;
    double unitPrice;
    int quantity;
    public CartItem(String title, double unitPrice, int quantity) {
        this.title = title;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }
    public double getSubtotal() {
        return unitPrice * quantity;
    }
}
public class Main {
    public static void main(String[] args) {
        ArrayList<CartItem> cart = new ArrayList<>();
        cart.add(new CartItem("Mechanical Keyboard", 85.00, 1));
        cart.add(new CartItem("Gaming Mouse", 45.00, 2));
        cart.add(new CartItem("USB-C Cable", 12.50, 3));
        double subtotal = 0;
        System.out.println("Shopping Cart Checkout:");
        for (CartItem item : cart) {
            System.out.printf("- %-20s x%d @ $%.2f = $%.2f\n", item.title, item.quantity, item.unitPrice, item.getSubtotal());
            subtotal += item.getSubtotal();
        }
        double tax = subtotal * 0.075; // 7.5% Tax
        double discount = subtotal > 150 ? 20.0 : 0.0;
        double finalTotal = subtotal + tax - discount;
        System.out.println("-------------------------------------------");
        System.out.printf("Gross Subtotal:     $%.2f\n", subtotal);
        System.out.printf("Discount Applied:  -$%.2f\n", discount);
        System.out.printf("Estimated Tax (7.5%): $%.2f\n", tax);
        System.out.printf("FINAL PAYABLE:       $%.2f\n", finalTotal);
    }
}`,
    expectedOutput: `Shopping Cart Checkout:\n- Mechanical Keyboard  x1 @ $85.00 = $85.00\n- Gaming Mouse         x2 @ $45.00 = $90.00\n- USB-C Cable          x3 @ $12.50 = $37.50\n-------------------------------------------\nGross Subtotal:     $212.50\nDiscount Applied:  -$20.00\nEstimated Tax (7.5%): $15.94\nFINAL PAYABLE:       $208.44`,
    explanation: "",
    keyPoints: [""],
    tags: ["project", "ecommerce", "cart", "billing"],
  },
  {
    id: "prog-102",
    title: "Secure Password Strength Validator and Scoring",
    bengaliTitle: "",
    chapter: 15,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Projects",
    description: "",
    code: `public class Main {
    public static int evaluatePassword(String password) {
        int score = 0;
        if (password.length() >= 8) score++;
        if (password.length() >= 12) score++;
        if (password.matches(".*[A-Z].*")) score++;
        if (password.matches(".*[a-z].*")) score++;
        if (password.matches(".*[0-9].*")) score++;
        if (password.matches(".*[!@#$%^&*()].*")) score++;
        return score;
    }
    public static void main(String[] args) {
        String[] samples = {"pass123", "Java2024!", "Secret#P@ssw0rdSecure!"};
        for (String p : samples) {
            int score = evaluatePassword(p);
            String level = switch (score) {
                case 0, 1, 2 -> "WEAK";
                case 3, 4 -> "MODERATE";
                default -> "STRONG & SECURE";
            };
            System.out.printf("Password: %-25s | Score: %d/6 -> %s\n", p, score, level);
        }
    }
}`,
    expectedOutput: `Password: pass123                   | Score: 3/6 -> MODERATE\nPassword: Java2024!                 | Score: 5/6 -> STRONG & SECURE\nPassword: Secret#P@ssw0rdSecure!    | Score: 6/6 -> STRONG & SECURE`,
    explanation: "  (Regex)",
    keyPoints: [""],
    tags: ["project", "security", "password", "regex"],
  },
  {
    id: "prog-103",
    title: "Caesar Cipher Encryption & Decryption Engine",
    bengaliTitle: "",
    chapter: 15,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Projects",
    description: "",
    code: `public class Main {
    public static String encrypt(String text, int shift) {
        StringBuilder result = new StringBuilder();
        shift = shift % 26;
        for (char c : text.toCharArray()) {
            if (Character.isUpperCase(c)) {
                char ch = (char) ('A' + (c - 'A' + shift) % 26);
                result.append(ch);
            } else if (Character.isLowerCase(c)) {
                char ch = (char) ('a' + (c - 'a' + shift) % 26);
                result.append(ch);
            } else {
                result.append(c);
            }
        }
        return result.toString();
    }
    public static String decrypt(String text, int shift) {
        return encrypt(text, 26 - (shift % 26));
    }
    public static void main(String[] args) {
        String original = "Java Master Pro 17 Security!";
        int shift = 4;
        String encrypted = encrypt(original, shift);
        String decrypted = decrypt(encrypted, shift);
        System.out.println("Original Message : " + original);
        System.out.println("Encrypted Cipher : " + encrypted);
        System.out.println("Decrypted Back   : " + decrypted);
    }
}`,
    expectedOutput: `Original Message : Java Master Pro 17 Security!\nEncrypted Cipher : Neze Qewxiv Tvs 17 Wigyvmxc!\nDecrypted Back   : Java Master Pro 17 Security!`,
    explanation: "  (Modulo 26)",
    keyPoints: [""],
    tags: ["project", "cryptography", "caesar-cipher"],
  },
  {
    id: "prog-104",
    title: "Tic-Tac-Toe Game State & Win Validator",
    bengaliTitle: "",
    chapter: 15,
    chapterTitle: "",
    difficulty: "advanced",
    category: "Projects",
    description: "",
    code: `public class Main {
    public static void printBoard(char[][] board) {
        for (int r = 0; r < 3; r++) {
            System.out.printf(" %c | %c | %c \n", board[r][0], board[r][1], board[r][2]);
            if (r < 2) System.out.println("---+---+---");
        }
    }
    public static char checkWinner(char[][] b) {
        // Check Rows and Columns
        for (int i = 0; i < 3; i++) {
            if (b[i][0] != ' ' && b[i][0] == b[i][1] && b[i][1] == b[i][2]) return b[i][0];
            if (b[0][i] != ' ' && b[0][i] == b[1][i] && b[1][i] == b[2][i]) return b[0][i];
        }
        // Diagonals
        if (b[0][0] != ' ' && b[0][0] == b[1][1] && b[1][1] == b[2][2]) return b[0][0];
        if (b[0][2] != ' ' && b[0][2] == b[1][1] && b[1][1] == b[2][0]) return b[0][2];
        return ' '; // No winner yet
    }
    public static void main(String[] args) {
        char[][] board = {
            {'X', 'O', 'X'},
            {'O', 'X', 'O'},
            {' ', 'O', 'X'}
        };
        System.out.println("Current Tic-Tac-Toe Board State:");
        printBoard(board);
        char winner = checkWinner(board);
        System.out.println("\\nMatch Outcome: " + (winner != ' ' ? "Player '" + winner + "' WINS!" : "Game Draw or Ongoing."));
    }
}`,
    expectedOutput: `Current Tic-Tac-Toe Board State:\n X | O | X \n---+---+---\n O | X | O \n---+---+---\n   | O | X \n\nMatch Outcome: Player 'X' WINS!`,
    explanation: "",
    keyPoints: [""],
    tags: ["project", "game", "tic-tac-toe", "matrix"],
  },
  {
    id: "prog-105",
    title: "Library Management System with Book Borrowing Logic",
    bengaliTitle: "",
    chapter: 15,
    chapterTitle: "",
    difficulty: "advanced",
    category: "Projects",
    description: "",
    code: `import java.util.HashMap;
class LibraryBook {
    String title;
    boolean isAvailable = true;
    public LibraryBook(String title) {
        this.title = title;
    }
}
public class Main {
    private static HashMap<String, LibraryBook> catalog = new HashMap<>();
    public static void borrowBook(String isbn, String student) {
        LibraryBook book = catalog.get(isbn);
        if (book == null) {
            System.out.println("Book with ISBN " + isbn + " not in catalog.");
        } else if (!book.isAvailable) {
            System.out.println("Sorry, '" + book.title + "' is currently checked out.");
        } else {
            book.isAvailable = false;
            System.out.println("Success: '" + book.title + "' loaned out to " + student + ".");
        }
    }
    public static void returnBook(String isbn) {
        LibraryBook book = catalog.get(isbn);
        if (book != null && !book.isAvailable) {
            book.isAvailable = true;
            System.out.println("Returned: '" + book.title + "' is now back on shelf.");
        }
    }
    public static void main(String[] args) {
        catalog.put("ISBN-001", new LibraryBook("Clean Architecture"));
        catalog.put("ISBN-002", new LibraryBook("Java Concurrency in Practice"));
        System.out.println("=== Central University Library ===");
        borrowBook("ISBN-001", "Rieaz");
        borrowBook("ISBN-001", "Sumit"); // Attempt double borrow
        returnBook("ISBN-001");
        borrowBook("ISBN-001", "Sumit"); // Now succeeds
    }
}`,
    expectedOutput: `=== Central University Library ===\nSuccess: 'Clean Architecture' loaned out to Rieaz.\nSorry, 'Clean Architecture' is currently checked out.\nReturned: 'Clean Architecture' is now back on shelf.\nSuccess: 'Clean Architecture' loaned out to Sumit.`,
    explanation: "HashMap",
    keyPoints: [""],
    tags: ["project", "library", "management", "system"],
  },
];
