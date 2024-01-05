// Node class
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

// Linked list class
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Add a node to the end of the list
  add(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // Find the nth node from the end of the list
  findNthFromEnd(n) {
    // Check if the index is valid
    if (n <= 0 || n > this.size) {
      throw new Error("Invalid index");
    }

    // Find the length of the list
    let length = this.size;

    // Calculate the index of the nth node from the start of the list
    const index = length - n;

    // Traverse the list from the start, counting the nodes until you reach the nth node
    let current = this.head;
    let count = 0;
    while (current) {
      if (count === index) {
        return current.data;
      }
      current = current.next;
      count++;
    }
  }
}

// Create a linked list
const list = new LinkedList();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);

// Find the 2nd node from the end of the list
const nthNode = list.findNthFromEnd(2);

console.log(nthNode); // Output: 4
