// Class to represent a node of a singly linked list.
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Class to represent a singly linked list.
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Function to add a new node to the end of the linked list.
  add(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  // Function to reverse a linked list using a while loop.
  reverse() {
    let current = this.head;
    let previous = null;
    while (current) {
      const next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    this.head = previous;
  }

  // Function to print the linked list.
  print() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

// Create a new linked list.
const linkedList = new LinkedList();

// Add some data to the linked list.
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.add(4);
linkedList.add(5);

// Print the linked list before reversing.
console.log("Linked list before reversing:");
linkedList.print();

// Reverse the linked list.
linkedList.reverse();

// Print the linked list after reversing.
console.log("Linked list after reversing:");
linkedList.print();
