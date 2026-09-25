import { JavaProgram } from "../../types";

export const ch10_to_12_programs: JavaProgram[] = [
  // CHAPTER 10: Abstract Classes & Interfaces (64-70)
  {
    id: "prog-64",
    title: "Abstract Class with Abstract & Concrete Methods",
    bengaliTitle: "  (Abstract Class)",
    chapter: 10,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Abstraction",
    description: "",
    code: `abstract class PaymentGateway {
    abstract void processPayment(double amount);
    // Concrete shared method
    void generateReceipt(double amount) {
        System.out.printf("Official Receipt Generated for: $%.2f\n", amount);
    }
}
class BkashPayment extends PaymentGateway {
    @Override
    void processPayment(double amount) {
        System.out.println("Processing bKash Mobile Wallet payment of $" + amount);
    }
}
public class Main {
    public static void main(String[] args) {
        PaymentGateway gateway = new BkashPayment();
        gateway.processPayment(120.50);
        gateway.generateReceipt(120.50);
    }
}`,
    expectedOutput: `Processing bKash Mobile Wallet payment of $120.5\nOfficial Receipt Generated for: $120.50`,
    explanation: "",
    keyPoints: [""],
    tags: ["abstraction", "abstract-class", "oop"],
  },
  {
    id: "prog-65",
    title: "Multiple Interface Implementation",
    bengaliTitle: "  (Multiple Interfaces)",
    chapter: 10,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Interfaces",
    description: "  Printable   Exportable",
    code: `interface Printable {
    void print();
}
interface Exportable {
    void exportToPDF();
}
class Invoice implements Printable, Exportable {
    private int invoiceId = 5092;
    @Override
    public void print() {
        System.out.println("Printing Paper Invoice #" + invoiceId);
    }
    @Override
    public void exportToPDF() {
        System.out.println("Exporting Invoice #" + invoiceId + " to encrypted PDF file.");
    }
}
public class Main {
    public static void main(String[] args) {
        Invoice inv = new Invoice();
        inv.print();
        inv.exportToPDF();
    }
}`,
    expectedOutput: `Printing Paper Invoice #5092\nExporting Invoice #5092 to encrypted PDF file.`,
    explanation: "",
    keyPoints: ["  public   abstract"],
    tags: ["interfaces", "multiple-inheritance", "oop"],
  },
  {
    id: "prog-66",
    title: "Java 8+ Default and Static Methods in Interfaces",
    bengaliTitle: "  (default)",
    chapter: 10,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Interfaces",
    description: "",
    code: `interface Logger {
    void log(String message);
    // Default method with concrete body
    default void logError(String err) {
        System.err.println("[CRITICAL ERROR] " + err);
    }
    // Static helper method
    static String getTimestamp() {
        return "2026-09-20T00:00:00Z";
    }
}
class ConsoleLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println("[LOG] " + message);
    }
}
public class Main {
    public static void main(String[] args) {
        ConsoleLogger logger = new ConsoleLogger();
        logger.log("Application started successfully.");
        logger.logError("Database connection timed out.");
        System.out.println("Timestamp from static interface: " + Logger.getTimestamp());
    }
}`,
    expectedOutput: `[LOG] Application started successfully.\nTimestamp from static interface: 2026-09-20T00:00:00Z`,
    explanation: "default",
    keyPoints: [""],
    tags: ["default-methods", "java8", "interfaces"],
  },
  {
    id: "prog-67",
    title: "Functional Interface and Lambda Expressions",
    bengaliTitle: "  (Functional Interface & Lambda)",
    chapter: 10,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Interfaces",
    description: "",
    code: `@FunctionalInterface
interface MathOperation {
    int compute(int a, int b);
}
public class Main {
    public static void main(String[] args) {
        // Lambda implementation for addition
        MathOperation addition = (a, b) -> a + b;
        // Lambda implementation for multiplication
        MathOperation multiplication = (a, b) -> a * b;
        System.out.println("15 + 25 = " + addition.compute(15, 25));
        System.out.println("6 * 8 = " + multiplication.compute(6, 8));
    }
}`,
    expectedOutput: `15 + 25 = 40\n6 * 8 = 48`,
    explanation: "",
    keyPoints: ["@FunctionalInterface"],
    tags: ["functional-interface", "lambda", "modern-java"],
  },
  {
    id: "prog-68",
    title: "Comparable Interface for Natural Sorting",
    bengaliTitle: "Comparable",
    chapter: 10,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Interfaces",
    description: "compareTo",
    code: `import java.util.Arrays;
class Product implements Comparable<Product> {
    String name;
    double price;
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    @Override
    public int compareTo(Product other) {
        return Double.compare(this.price, other.price);
    }
    @Override
    public String toString() {
        return name + " ($" + price + ")";
    }
}
public class Main {
    public static void main(String[] args) {
        Product[] inventory = {
            new Product("Monitor", 220.0),
            new Product("Mouse", 25.0),
            new Product("Headphones", 85.0)
        };
        Arrays.sort(inventory);
        System.out.println("Products Sorted by Price: " + Arrays.toString(inventory));
    }
}`,
    expectedOutput: `Products Sorted by Price: [Mouse ($25.0), Headphones ($85.0), Monitor ($220.0)]`,
    explanation: "Arrays.sort()   compareTo()",
    keyPoints: ["  Comparable"],
    tags: ["comparable", "sorting", "interfaces"],
  },
  {
    id: "prog-69",
    title: "Private Methods inside Interfaces (Java 9+)",
    bengaliTitle: "  (Java 9+ Private Interface Methods)",
    chapter: 10,
    chapterTitle: "",
    difficulty: "advanced",
    category: "Interfaces",
    description: "",
    code: `interface DatabaseConnector {
    default void connectPostgres() {
        initDriver("PostgreSQL");
        System.out.println("Connected to Postgres Cluster.");
    }
    default void connectMySQL() {
        initDriver("MySQL");
        System.out.println("Connected to MySQL Database.");
    }
    // Private helper method inside interface
    private void initDriver(String dbType) {
        System.out.println("Loading security credentials & driver for " + dbType + "...");
    }
}
class AppDb implements DatabaseConnector {}
public class Main {
    public static void main(String[] args) {
        AppDb db = new AppDb();
        db.connectPostgres();
    }
}`,
    expectedOutput: `Loading security credentials & driver for PostgreSQL...\nConnected to Postgres Cluster.`,
    explanation: "",
    keyPoints: [""],
    tags: ["java9", "private-methods", "interfaces"],
  },
  {
    id: "prog-70",
    title: "Marker Interface and Tagging Pattern",
    bengaliTitle: "  (Marker Interface)",
    chapter: 10,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Interfaces",
    description: "",
    code: `interface Deletable {} // Empty Marker Interface
class TempFile implements Deletable {
    String filename = "cache_01.tmp";
}
class SystemConfig {
    String filename = "kernel_config.sys";
}
public class Main {
    public static void deleteIfAllowed(Object obj) {
        if (obj instanceof Deletable) {
            System.out.println("Permission Granted: Deleting temporary resource.");
        } else {
            System.out.println("Security Block: Object is protected and not Deletable!");
        }
    }
    public static void main(String[] args) {
        deleteIfAllowed(new TempFile());
        deleteIfAllowed(new SystemConfig());
    }
}`,
    expectedOutput: `Permission Granted: Deleting temporary resource.\nSecurity Block: Object is protected and not Deletable!`,
    explanation: "Serializable   Cloneable-",
    keyPoints: ["  instanceof"],
    tags: ["marker-interface", "design-pattern"],
  },
  // CHAPTER 11: Exception Handling (71-77)
  {
    id: "prog-71",
    title: "Basic Try-Catch Exception Recovery",
    bengaliTitle: "  (try-catch)",
    chapter: 11,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Exceptions",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int a = 50;
        int b = 0;
        try {
            int result = a / b;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.err.println("Caught Exception: Division by zero is impossible in integer arithmetic!");
            System.out.println("Handled gracefully: Defaulting result to 0.");
        }
        System.out.println("Program continues execution without crashing.");
    }
}`,
    expectedOutput: `Handled gracefully: Defaulting result to 0.\nProgram continues execution without crashing.`,
    explanation: "try   catch",
    keyPoints: ["catch"],
    tags: ["exceptions", "try-catch", "arithmetic"],
  },
  {
    id: "prog-72",
    title: "Multiple Catch Blocks and Exception Hierarchy",
    bengaliTitle: "",
    chapter: 11,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Exceptions",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        String text = null;
        int[] numbers = {10, 20, 30};
        try {
            // Uncomment one to test specific catches:
            int len = text.length(); // Causes NullPointerException
            int val = numbers[5];    // Causes ArrayIndexOutOfBoundsException
        } catch (NullPointerException e) {
            System.out.println("Handling Null Pointer: The object reference was null!");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Handling Array Bounds: Index exceeds array length!");
        } catch (Exception e) {
            System.out.println("Generic Fallback Exception: " + e.getMessage());
        }
    }
}`,
    expectedOutput: `Handling Null Pointer: The object reference was null!`,
    explanation: "  Exception",
    keyPoints: ["Exception"],
    tags: ["multiple-catch", "hierarchy", "exceptions"],
  },
  {
    id: "prog-73",
    title: "The Finally Block for Guaranteed Cleanup",
    bengaliTitle: "finally",
    chapter: 11,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Exceptions",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Opening database connection...");
        try {
            int calc = 100 / 2;
            System.out.println("Query executed: " + calc);
        } catch (Exception e) {
            System.out.println("Exception handled.");
        } finally {
            System.out.println("FINALLY BLOCK: Database connection closed safely!");
        }
    }
}`,
    expectedOutput: `Opening database connection...\nQuery executed: 50\nFINALLY BLOCK: Database connection closed safely!`,
    explanation: "finally",
    keyPoints: ["try-  return   finally"],
    tags: ["finally", "cleanup", "exceptions"],
  },
  {
    id: "prog-74",
    title: "Throwing Exceptions with throw Keyword",
    bengaliTitle: "  (throw",
    chapter: 11,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Exceptions",
    description: "",
    code: `public class Main {
    public static void validateAge(int age) {
        if (age < 18) {
            throw new IllegalArgumentException("Age restriction: Must be at least 18 years old! Provided: " + age);
        }
        System.out.println("Access granted: Age verified.");
    }
    public static void main(String[] args) {
        try {
            validateAge(15);
        } catch (IllegalArgumentException e) {
            System.out.println("Verification Failed -> " + e.getMessage());
        }
    }
}`,
    expectedOutput: `Verification Failed -> Age restriction: Must be at least 18 years old! Provided: 15`,
    explanation: "throw",
    keyPoints: ["  throw"],
    tags: ["throw", "validation", "exceptions"],
  },
  {
    id: "prog-75",
    title: "Declaring Checked Exceptions with throws",
    bengaliTitle: "throws",
    chapter: 11,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Exceptions",
    description: "",
    code: `public class Main {
    public static void checkFileExistence(String path) throws java.io.FileNotFoundException {
        if (!path.endsWith(".txt")) {
            throw new java.io.FileNotFoundException("Target document not found at: " + path);
        }
        System.out.println("Document loaded: " + path);
    }
    public static void main(String[] args) {
        try {
            checkFileExistence("system_log.pdf");
        } catch (java.io.FileNotFoundException e) {
            System.out.println("Handled in main: " + e.getMessage());
        }
    }
}`,
    expectedOutput: `Handled in main: Target document not found at: system_log.pdf`,
    explanation: "throws",
    keyPoints: [""],
    tags: ["throws", "checked-exceptions"],
  },
  {
    id: "prog-76",
    title: "Custom User-Defined Exception Class",
    bengaliTitle: "",
    chapter: 11,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Exceptions",
    description: "Exception",
    code: `class InsufficientFundsException extends Exception {
    private double deficit;
    public InsufficientFundsException(String message, double deficit) {
        super(message);
        this.deficit = deficit;
    }
    public double getDeficit() { return deficit; }
}
public class Main {
    public static void withdraw(double balance, double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Account overdraft forbidden!", (amount - balance));
        }
        System.out.println("Withdrawal approved. Remaining: $" + (balance - amount));
    }
    public static void main(String[] args) {
        try {
            withdraw(500, 750);
        } catch (InsufficientFundsException e) {
            System.out.println("Alert: " + e.getMessage());
            System.out.println("Shortage amount: $" + e.getDeficit());
        }
    }
}`,
    expectedOutput: `Alert: Account overdraft forbidden!\nShortage amount: $250.0`,
    explanation: "",
    keyPoints: ["Exception   Checked,   RuntimeException   Unchecked"],
    tags: ["custom-exception", "oop", "exceptions"],
  },
  {
    id: "prog-77",
    title: "Try-With-Resources for Automatic Resource Closing",
    bengaliTitle: "  (AutoCloseable Resources)",
    chapter: 11,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Exceptions",
    description: "",
    code: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        String testData = "Java17\nMasterPro\nLab";
        // Try-with-resources   close() 
        try (Scanner sc = new Scanner(testData)) {
            while (sc.hasNextLine()) {
                System.out.println("Read line: " + sc.nextLine());
            }
        } // sc.close() is called automatically here
        System.out.println("Scanner resource successfully auto-closed.");
    }
}`,
    expectedOutput: `Read line: Java17\nRead line: MasterPro\nRead line: Lab\nScanner resource successfully auto-closed.`,
    explanation: "AutoCloseable",
    keyPoints: ["finally   close()"],
    tags: ["try-with-resources", "java7", "autocloseable"],
  },
  // CHAPTER 12: Java Collections Framework (78-84)
  {
    id: "prog-78",
    title: "ArrayList Operations and Dynamic Resizing",
    bengaliTitle: "  (ArrayList)",
    chapter: 12,
    chapterTitle: "  (Collections Framework)",
    difficulty: "beginner",
    category: "Collections",
    description: "",
    code: `import java.util.ArrayList;
public class Main {
    public static void main(String[] args) {
        ArrayList<String> frameworks = new ArrayList<>();
        frameworks.add("Spring Boot");
        frameworks.add("Hibernate");
        frameworks.add("Quarkus");
        frameworks.add("Micronaut");
        System.out.println("Initial List: " + frameworks);
        System.out.println("List Size: " + frameworks.size());
        frameworks.remove("Quarkus");
        frameworks.set(1, "Hibernate ORM 6");
        System.out.println("Modified List: " + frameworks);
        System.out.println("Contains Spring Boot? " + frameworks.contains("Spring Boot"));
    }
}`,
    expectedOutput: `Initial List: [Spring Boot, Hibernate, Quarkus, Micronaut]\nList Size: 4\nModified List: [Spring Boot, Hibernate ORM 6, Micronaut]\nContains Spring Boot? true`,
    explanation: "ArrayList   O(1)",
    keyPoints: [""],
    tags: ["collections", "arraylist", "list"],
  },
  {
    id: "prog-79",
    title: "LinkedList as Queue and Deque",
    bengaliTitle: "  (LinkedList)",
    chapter: 12,
    chapterTitle: "  (Collections Framework)",
    difficulty: "intermediate",
    category: "Collections",
    description: "  O(1)",
    code: `import java.util.LinkedList;
public class Main {
    public static void main(String[] args) {
        LinkedList<String> tasks = new LinkedList<>();
        tasks.add("Task 2: Code Review");
        tasks.addFirst("Task 1: Requirements Analysis");
        tasks.addLast("Task 3: Production Deployment");
        System.out.println("Current Queue: " + tasks);
        System.out.println("Head Element (Peek): " + tasks.peekFirst());
        String completed = tasks.pollFirst(); // Removes head
        System.out.println("Completed & Removed: " + completed);
        System.out.println("Remaining Queue: " + tasks);
    }
}`,
    expectedOutput: `Current Queue: [Task 1: Requirements Analysis, Task 2: Code Review, Task 3: Production Deployment]\nHead Element (Peek): Task 1: Requirements Analysis\nCompleted & Removed: Task 1: Requirements Analysis\nRemaining Queue: [Task 2: Code Review, Task 3: Production Deployment]`,
    explanation: "LinkedList",
    keyPoints: ["Queue   Deque"],
    tags: ["linkedlist", "queue", "collections"],
  },
  {
    id: "prog-80",
    title: "HashSet for Unique Elements and Deduplication",
    bengaliTitle: "  (HashSet)",
    chapter: 12,
    chapterTitle: "  (Collections Framework)",
    difficulty: "beginner",
    category: "Collections",
    description: "  O(1)",
    code: `import java.util.HashSet;
public class Main {
    public static void main(String[] args) {
        HashSet<String> emailSubscribers = new HashSet<>();
        emailSubscribers.add("user@example.com");
        emailSubscribers.add("admin@domain.org");
        emailSubscribers.add("user@example.com"); // Duplicate ignored
        System.out.println("Unique Subscribers Count: " + emailSubscribers.size());
        System.out.println("Subscriber Set: " + emailSubscribers);
    }
}`,
    expectedOutput: `Unique Subscribers Count: 2\nSubscriber Set: [admin@domain.org, user@example.com]`,
    explanation: "HashSet",
    keyPoints: [" ", "  equals()   hashCode()"],
    tags: ["hashset", "set", "deduplication"],
  },
  {
    id: "prog-81",
    title: "TreeSet for Automatically Sorted Sets",
    bengaliTitle: "  (TreeSet)",
    chapter: 12,
    chapterTitle: "  (Collections Framework)",
    difficulty: "intermediate",
    category: "Collections",
    description: "",
    code: `import java.util.TreeSet;
public class Main {
    public static void main(String[] args) {
        TreeSet<Integer> scores = new TreeSet<>();
        scores.add(85);
        scores.add(42);
        scores.add(99);
        scores.add(73);
        scores.add(42); // Ignored duplicate
        System.out.println("Ascending Sorted Set: " + scores);
        System.out.println("Lowest Score (First): " + scores.first());
        System.out.println("Highest Score (Last): " + scores.last());
        System.out.println("Higher than 73: " + scores.higher(73));
    }
}`,
    expectedOutput: `Ascending Sorted Set: [42, 73, 85, 99]\nLowest Score (First): 42\nHighest Score (Last): 99\nHigher than 73: 85`,
    explanation: "TreeSet   O(log n)",
    keyPoints: ["NavigableSet   higher/lower"],
    tags: ["treeset", "sorting", "bst"],
  },
  {
    id: "prog-82",
    title: "HashMap Key-Value Mapping and Traversal",
    bengaliTitle: "  (HashMap)",
    chapter: 12,
    chapterTitle: "  (Collections Framework)",
    difficulty: "beginner",
    category: "Collections",
    description: "",
    code: `import java.util.HashMap;
import java.util.Map;
public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> studentGrades = new HashMap<>();
        studentGrades.put("Rieaz", 98);
        studentGrades.put("Tanvir", 84);
        studentGrades.put("Nafis", 91);
        System.out.println("Rieaz's Grade: " + studentGrades.get("Rieaz"));
        System.out.println("Unknown student: " + studentGrades.getOrDefault("Unknown", 0));
        System.out.println("\\nFull Gradebook (Key-Value):");
        for (Map.Entry<String, Integer> entry : studentGrades.entrySet()) {
            System.out.println("Student: " + entry.getKey() + " -> Score: " + entry.getValue());
        }
    }
}`,
    expectedOutput: `Rieaz's Grade: 98\nUnknown student: 0\n\nFull Gradebook (Key-Value):\nStudent: Nafis -> Score: 91\nStudent: Rieaz -> Score: 98\nStudent: Tanvir -> Score: 84`,
    explanation: "HashMap   O(1)",
    keyPoints: [""],
    tags: ["hashmap", "key-value", "collections"],
  },
  {
    id: "prog-83",
    title: "PriorityQueue as Min-Heap",
    bengaliTitle: "  (PriorityQueue)",
    chapter: 12,
    chapterTitle: "  (Collections Framework)",
    difficulty: "intermediate",
    category: "Collections",
    description: "",
    code: `import java.util.PriorityQueue;
public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.add(45);
        pq.add(10);
        pq.add(78);
        pq.add(23);
        System.out.println("Extracting in priority order (Min-Heap):");
        while (!pq.isEmpty()) {
            System.out.print(pq.poll() + " ");
        }
        System.out.println();
    }
}`,
    expectedOutput: `Extracting in priority order (Min-Heap):\n10 23 45 78 `,
    explanation: "PriorityQueue   (Min-Heap)",
    keyPoints: ["  (Dijkstra)"],
    tags: ["priority-queue", "heap", "algorithms"],
  },
  {
    id: "prog-84",
    title: "Word Frequency Counter with HashMap",
    bengaliTitle: "  (Frequency Counter)",
    chapter: 12,
    chapterTitle: "  (Collections Framework)",
    difficulty: "intermediate",
    category: "Collections",
    description: "",
    code: `import java.util.HashMap;
public class Main {
    public static void main(String[] args) {
        String text = "java python java typescript java python csharp";
        String[] words = text.split(" ");
        HashMap<String, Integer> frequency = new HashMap<>();
        for (String word : words) {
            frequency.put(word, frequency.getOrDefault(word, 0) + 1);
        }
        System.out.println("Word Frequencies: " + frequency);
    }
}`,
    expectedOutput: `Word Frequencies: {csharp=1, java=3, python=2, typescript=1}`,
    explanation: "getOrDefault()",
    keyPoints: [""],
    tags: ["hashmap", "frequency", "strings"],
  },
];
