import { JavaProgram } from "../../types";

export const ch07_to_09_programs: JavaProgram[] = [
  // CHAPTER 7: Arrays & Matrices (43-49)
  {
    id: "prog-43",
    title: "1D Array Declaration, Traversal & Sum",
    bengaliTitle: "",
    chapter: 7,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Arrays",
    description: "  (for-each)",
    code: `public class Main {
    public static void main(String[] args) {
        int[] scores = {85, 92, 78, 90, 88};
        int sum = 0;
        System.out.print("Array Elements: ");
        for (int score : scores) {
            System.out.print(score + " ");
            sum += score;
        }
        double average = (double) sum / scores.length;
        System.out.println("\\nTotal Sum: " + sum);
        System.out.printf("Average Score: %.2f\n", average);
    }
}`,
    expectedOutput: `Array Elements: 85 92 78 90 88 \nTotal Sum: 433\nAverage Score: 86.60`,
    explanation: "for-each",
    keyPoints: ["scores.length"],
    tags: ["arrays", "for-each", "traversal"],
  },
  {
    id: "prog-44",
    title: "Find Maximum and Minimum in Array",
    bengaliTitle: "",
    chapter: 7,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Arrays",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int[] data = {45, 12, 89, 23, 7, 64, 91, 38};
        int min = data[0];
        int max = data[0];
        for (int i = 1; i < data.length; i++) {
            if (data[i] < min) min = data[i];
            if (data[i] > max) max = data[i];
        }
        System.out.println("Dataset: {45, 12, 89, 23, 7, 64, 91, 38}");
        System.out.println("Minimum: " + min);
        System.out.println("Maximum: " + max);
    }
}`,
    expectedOutput: `Dataset: {45, 12, 89, 23, 7, 64, 91, 38}\nMinimum: 7\nMaximum: 91`,
    explanation: "  min   max   O(n)",
    keyPoints: ["  (length - 1)"],
    tags: ["arrays", "min-max", "search"],
  },
  {
    id: "prog-45",
    title: "Array In-Place Reversal Algorithm",
    bengaliTitle: "  (In-Place Reversal)",
    chapter: 7,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Arrays",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50, 60};
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
        System.out.print("Reversed Array: ");
        for (int n : arr) {
            System.out.print(n + " ");
        }
        System.out.println();
    }
}`,
    expectedOutput: `Reversed Array: 60 50 40 30 20 10 `,
    explanation: "Two-pointer   O(1)",
    keyPoints: [""],
    tags: ["arrays", "two-pointers", "reverse"],
  },
  {
    id: "prog-46",
    title: "Linear Search Algorithm",
    bengaliTitle: "  (Linear Search)",
    chapter: 7,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Arrays",
    description: "",
    code: `public class Main {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i; // Found at index
        }
        return -1; // Not found     }
    public static void main(String[] args) {
        int[] numbers = {14, 52, 33, 89, 75, 21};
        int target = 89;
        int index = linearSearch(numbers, target);
        if (index != -1) {
            System.out.println("Element " + target + " found at index: " + index);
        } else {
            System.out.println("Element not found in array.");
        }
    }
}`,
    expectedOutput: `Element 89 found at index: 3`,
    explanation: "  (unsorted)   O(n)",
    keyPoints: [""],
    tags: ["arrays", "search", "algorithms"],
  },
  {
    id: "prog-47",
    title: "Binary Search on Sorted Array",
    bengaliTitle: "  (Binary Search)",
    chapter: 7,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Arrays",
    description: "  O(log n)",
    code: `public class Main {
    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
    public static void main(String[] args) {
        int[] sorted = {5, 12, 19, 28, 35, 47, 59, 72, 88};
        int target = 47;
        int pos = binarySearch(sorted, target);
        System.out.println("Sorted search target: " + target);
        System.out.println("Found at index position: " + pos);
    }
}`,
    expectedOutput: `Sorted search target: 47\nFound at index position: 5`,
    explanation: "",
    keyPoints: ["mid = low + (high - low) / 2"],
    tags: ["binary-search", "algorithms", "sorted"],
  },
  {
    id: "prog-48",
    title: "Bubble Sort Algorithm with Step Count",
    bengaliTitle: "  (Bubble Sort)",
    chapter: 7,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Arrays",
    description: "",
    code: `public class Main {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break; // Optimized early exit
        }
    }
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(numbers);
        System.out.print("Sorted Array: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
    expectedOutput: `Sorted Array: 11 12 22 25 34 64 90 `,
    explanation: "",
    keyPoints: ["swapped   O(n)"],
    tags: ["sorting", "bubble-sort", "algorithms"],
  },
  {
    id: "prog-49",
    title: "2D Matrix Addition and Formatting",
    bengaliTitle: "  (2D Matrix Addition)",
    chapter: 7,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Arrays",
    description: "",
    code: `public class Main {
    public static void main(String[] args) {
        int[][] A = {
            {1, 2},
            {3, 4}
        };
        int[][] B = {
            {5, 6},
            {7, 8}
        };
        int[][] C = new int[2][2];
        System.out.println("Result Matrix (A + B):");
        for (int r = 0; r < 2; r++) {
            for (int c = 0; c < 2; c++) {
                C[r][c] = A[r][c] + B[r][c];
                System.out.print(C[r][c] + "\\t");
            }
            System.out.println();
        }
    }
}`,
    expectedOutput: `Result Matrix (A + B):\n6\t8\t\n10\t12\t`,
    explanation: "",
    keyPoints: [""],
    tags: ["2d-arrays", "matrix", "math"],
  },
  // CHAPTER 8: OOP Fundamentals (50-56)
  {
    id: "prog-50",
    title: "Class and Object Instantiation",
    bengaliTitle: "  (OOP Fundamentals)",
    chapter: 8,
    chapterTitle: "  (OOP)",
    difficulty: "beginner",
    category: "OOP",
    description: "",
    code: `class Student {
    String name;
    int rollNumber;
    void displayInfo() {
        System.out.println("Roll: " + rollNumber + " | Name: " + name);
    }
}
public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "Sakib Hasan";
        s1.rollNumber = 75;
        Student s2 = new Student();
        s2.name = "Tamim Iqbal";
        s2.rollNumber = 28;
        s1.displayInfo();
        s2.displayInfo();
    }
}`,
    expectedOutput: `Roll: 75 | Name: Sakib Hasan\nRoll: 28 | Name: Tamim Iqbal`,
    explanation: "new   (Heap)",
    keyPoints: [""],
    tags: ["oop", "class", "object"],
  },
  {
    id: "prog-51",
    title: "Parameterized Constructor and this Keyword",
    bengaliTitle: "  this",
    chapter: 8,
    chapterTitle: "  (OOP)",
    difficulty: "beginner",
    category: "OOP",
    description: "",
    code: `class Book {
    private String title;
    private double price;
    public Book(String title, double price) {
        this.title = title;
        this.price = price;
    }
    public void printDetails() {
        System.out.printf("Book: %-20s | Price: $%.2f\n", this.title, this.price);
    }
}
public class Main {
    public static void main(String[] args) {
        Book b1 = new Book("Effective Java", 45.00);
        Book b2 = new Book("Clean Code", 38.50);
        b1.printDetails();
        b2.printDetails();
    }
}`,
    expectedOutput: `Book: Effective Java       | Price: $45.00\nBook: Clean Code           | Price: $38.50`,
    explanation: "this",
    keyPoints: [""],
    tags: ["oop", "constructor", "this"],
  },
  {
    id: "prog-52",
    title: "Encapsulation with Private Fields & Getters/Setters",
    bengaliTitle: "  (Encapsulation)",
    chapter: 8,
    chapterTitle: "  (OOP)",
    difficulty: "intermediate",
    category: "OOP",
    description: "",
    code: `class BankAccount {
    private String accountNumber;
    private double balance;
    public BankAccount(String accNo, double initialBalance) {
        this.accountNumber = accNo;
        this.balance = Math.max(0, initialBalance);
    }
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            System.out.println("Deposited: $" + amount);
        }
    }
    public double getBalance() {
        return this.balance;
    }
}
public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("AC-9842", 500);
        acc.deposit(250);
        System.out.println("Final Account Balance: $" + acc.getBalance());
    }
}`,
    expectedOutput: `Deposited: $250.0\nFinal Account Balance: $750.0`,
    explanation: "",
    keyPoints: ["private   public"],
    tags: ["encapsulation", "oop", "getters-setters"],
  },
  {
    id: "prog-53",
    title: "Static Variables and Static Methods",
    bengaliTitle: "  (Shared Memory)",
    chapter: 8,
    chapterTitle: "  (OOP)",
    difficulty: "intermediate",
    category: "OOP",
    description: "",
    code: `class Counter {
    static int globalCount = 0; // Shared across all instances
    int instanceId;
    public Counter(int id) {
        this.instanceId = id;
        globalCount++;
    }
    public static void showGlobalCount() {
        System.out.println("Total Instances Created: " + globalCount);
    }
}
public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter(1);
        Counter c2 = new Counter(2);
        Counter c3 = new Counter(3);
        Counter.showGlobalCount();
    }
}`,
    expectedOutput: `Total Instances Created: 3`,
    explanation: "static",
    keyPoints: ["  Counter.showGlobalCount()"],
    tags: ["static", "oop", "memory"],
  },
  {
    id: "prog-54",
    title: "Constructor Chaining using this()",
    bengaliTitle: "  (this()",
    chapter: 8,
    chapterTitle: "  (OOP)",
    difficulty: "intermediate",
    category: "OOP",
    description: "",
    code: `class Employee {
    private String name;
    private String department;
    private double salary;
    public Employee(String name) {
        this(name, "General", 30000.0); // Chaining
    }
    public Employee(String name, String department, double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }
    public void display() {
        System.out.println("Emp: " + name + " | Dept: " + department + " | Salary: $" + salary);
    }
}
public class Main {
    public static void main(String[] args) {
        Employee e1 = new Employee("Rahim");
        Employee e2 = new Employee("Karim", "Engineering", 75000.0);
        e1.display();
        e2.display();
    }
}`,
    expectedOutput: `Emp: Rahim | Dept: General | Salary: $30000.0\nEmp: Karim | Dept: Engineering | Salary: $75000.0`,
    explanation: "this()",
    keyPoints: ["  this(...)"],
    tags: ["constructor-chaining", "oop"],
  },
  {
    id: "prog-55",
    title: "Copy Constructor Pattern in Java",
    bengaliTitle: "  (Object Duplication)",
    chapter: 8,
    chapterTitle: "  (OOP)",
    difficulty: "intermediate",
    category: "OOP",
    description: "",
    code: `class Point {
    int x, y;
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
    // Copy Constructor
    public Point(Point other) {
        this.x = other.x;
        this.y = other.y;
    }
    public void show() {
        System.out.println("Point Coordinates: (" + x + ", " + y + ")");
    }
}
public class Main {
    public static void main(String[] args) {
        Point p1 = new Point(15, 30);
        Point p2 = new Point(p1); // Cloning via copy constructor
        p1.show();
        p2.show();
    }
}`,
    expectedOutput: `Point Coordinates: (15, 30)\nPoint Coordinates: (15, 30)`,
    explanation: "",
    keyPoints: ["  (Deep Copy)"],
    tags: ["oop", "copy-constructor", "design"],
  },
  {
    id: "prog-56",
    title: "Immutable Class Architecture",
    bengaliTitle: "",
    chapter: 8,
    chapterTitle: "  (OOP)",
    difficulty: "advanced",
    category: "OOP",
    description: "final   final",
    code: `final class ImmutableUser {
    private final String username;
    private final String email;
    public ImmutableUser(String username, String email) {
        this.username = username;
        this.email = email;
    }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}
public class Main {
    public static void main(String[] args) {
        ImmutableUser user = new ImmutableUser("rieaz", "rieaz@example.com");
        System.out.println("User: " + user.getUsername() + " (" + user.getEmail() + ")");
    }
}`,
    expectedOutput: `User: rieaz (rieaz@example.com)`,
    explanation: "  (Thread-safe)",
    keyPoints: ["  final"],
    tags: ["immutability", "oop", "architecture"],
  },
  // CHAPTER 9: OOP Inheritance & Polymorphism (57-63)
  {
    id: "prog-57",
    title: "Single Inheritance using extends Keyword",
    bengaliTitle: "  (Single Inheritance)",
    chapter: 9,
    chapterTitle: "",
    difficulty: "beginner",
    category: "Inheritance",
    description: "",
    code: `class Animal {
    void eat() {
        System.out.println("Animal is eating food.");
    }
}
class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking: Woof Woof!");
    }
}
public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.eat();  // Inherited method
        myDog.bark(); // Own method
    }
}`,
    expectedOutput: `Animal is eating food.\nDog is barking: Woof Woof!`,
    explanation: "extends   public   protected",
    keyPoints: [""],
    tags: ["inheritance", "oop", "extends"],
  },
  {
    id: "prog-58",
    title: "Method Overriding with @Override Annotation",
    bengaliTitle: "  (Method Overriding)",
    chapter: 9,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Polymorphism",
    description: "",
    code: `class Vehicle {
    void start() {
        System.out.println("Starting generic vehicle engine...");
    }
}
class ElectricCar extends Vehicle {
    @Override
    void start() {
        System.out.println("Electric car powers on silently with battery pack!");
    }
}
public class Main {
    public static void main(String[] args) {
        Vehicle v = new Vehicle();
        v.start();
        Vehicle ev = new ElectricCar(); // Polymorphic call
        ev.start();
    }
}`,
    expectedOutput: `Starting generic vehicle engine...\nElectric car powers on silently with battery pack!`,
    explanation: "",
    keyPoints: ["@Override"],
    tags: ["overriding", "polymorphism", "runtime"],
  },
  {
    id: "prog-59",
    title: "Super Keyword for Parent Constructor & Methods",
    bengaliTitle: "super",
    chapter: 9,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Inheritance",
    description: "",
    code: `class Person {
    String name;
    public Person(String name) {
        this.name = name;
    }
    void greet() {
        System.out.println("Hello, I am " + name);
    }
}
class Developer extends Person {
    String techStack;
    public Developer(String name, String techStack) {
        super(name); // Call parent constructor
        this.techStack = techStack;
    }
    @Override
    void greet() {
        super.greet(); // Call parent greet
        System.out.println("I build robust systems with " + techStack);
    }
}
public class Main {
    public static void main(String[] args) {
        Developer dev = new Developer("Rieaz", "Java 17 & TypeScript");
        dev.greet();
    }
}`,
    expectedOutput: `Hello, I am Rieaz\nI build robust systems with Java 17 & TypeScript`,
    explanation: "super()",
    keyPoints: ["super.methodName()"],
    tags: ["super", "inheritance", "constructor"],
  },
  {
    id: "prog-60",
    title: "Dynamic Method Dispatch (Runtime Polymorphism)",
    bengaliTitle: "",
    chapter: 9,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Polymorphism",
    description: "",
    code: `class Shape {
    void render() {
        System.out.println("Rendering a shape.");
    }
}
class Circle extends Shape {
    @Override
    void render() {
        System.out.println("Drawing a 2D Circle with radius calculation.");
    }
}
class Square extends Shape {
    @Override
    void render() {
        System.out.println("Drawing a 2D Square with four equal sides.");
    }
}
public class Main {
    public static void main(String[] args) {
        Shape[] shapes = {new Circle(), new Square(), new Shape()};
        for (Shape s : shapes) {
            s.render(); // Dynamic dispatch at runtime
        }
    }
}`,
    expectedOutput: `Drawing a 2D Circle with radius calculation.\nDrawing a 2D Square with four equal sides.\nRendering a shape.`,
    explanation: "  (Late Binding)",
    keyPoints: ["  (Open-Closed Principle)"],
    tags: ["polymorphism", "dispatch", "oop"],
  },
  {
    id: "prog-61",
    title: "The instanceof Operator and Safe Downcasting",
    bengaliTitle: "instanceof",
    chapter: 9,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Inheritance",
    description: "",
    code: `class Device {}
class Smartphone extends Device {
    void makeCall() {
        System.out.println("Calling emergency contact...");
    }
}
public class Main {
    public static void main(String[] args) {
        Device myDevice = new Smartphone();
        if (myDevice instanceof Smartphone) {
            Smartphone phone = (Smartphone) myDevice; // Safe downcasting
            phone.makeCall();
        } else {
            System.out.println("Object is not a Smartphone.");
        }
    }
}`,
    expectedOutput: `Calling emergency contact...`,
    explanation: "instanceof",
    keyPoints: ["ClassCastException   instanceof"],
    tags: ["instanceof", "casting", "type-safety"],
  },
  {
    id: "prog-62",
    title: "Java 16+ Pattern Matching for instanceof",
    bengaliTitle: "  (Java 16+ Pattern Matching)",
    chapter: 9,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Polymorphism",
    description: "",
    code: `public class Main {
    public static void printLengthIfString(Object obj) {
        // Pattern matching: 
        if (obj instanceof String s) {
            System.out.println("String detected with length: " + s.length() + " ('" + s + "')");
        } else {
            System.out.println("Not a string instance: " + obj);
        }
    }
    public static void main(String[] args) {
        printLengthIfString("Java Master Pro 17");
        printLengthIfString(2024);
    }
}`,
    expectedOutput: `String detected with length: 18 ('Java Master Pro 17')\nNot a string instance: 2024`,
    explanation: "  'if (obj instanceof String s)'",
    keyPoints: [""],
    tags: ["java16", "pattern-matching", "modern-java"],
  },
  {
    id: "prog-63",
    title: "Final Methods and Classes (Preventing Overriding)",
    bengaliTitle: "final",
    chapter: 9,
    chapterTitle: "",
    difficulty: "intermediate",
    category: "Inheritance",
    description: "",
    code: `class SecurityPolicy {
    public final void verifyFingerprint() {
        System.out.println("Fingerprint cryptographic hash verified securely.");
    }
}
class MobileApp extends SecurityPolicy {
    // verifyFingerprint() cannot be overridden
}
public class Main {
    public static void main(String[] args) {
        MobileApp app = new MobileApp();
        app.verifyFingerprint();
    }
}`,
    expectedOutput: `Fingerprint cryptographic hash verified securely.`,
    explanation: "final   final   extends  : String)",
    keyPoints: ["  final"],
    tags: ["final", "security", "oop"],
  },
];
