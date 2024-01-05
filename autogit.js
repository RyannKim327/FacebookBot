// Node class to represent each node in the linked list
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// LinkedList class to manage the operations of the linked list
class LinkedList {
  constructor() {
    this.head = null;
  }

  // Insert a new node at the end of the linked list
  insert(data) {
    const newNode = new Node(data);
    
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  // Remove a node with matching data from the linked list
  remove(data) {
    if (this.head === null) {
      return;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    let previous = null;
    while (current !== null) {
      if (current.data === data) {
        previous.next = current.next;
        return;
      }
      previous = current;
      current = current.next;
    }
  }

  // Search for a node with matching data in the linked list
  search(data) {
    let current = this.head;
    while (current !== null) {
      if (current.data === data) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Print the elements of the linked list
  print() {
    let current = this.head;
    let elements = [];
    while (current !== null) {
      elements.push(current.data);
      current = current.next;
    }
    console.log(elements.join(' -> '));
  }
}

// Example usage
const linkedList = new LinkedList();
linkedList.insert(5);
linkedList.insert(10);
linkedList.insert(15);

linkedList.print(); // Output: 5 -> 10 -> 15

linkedList.remove(10);

console.log(linkedList.search(10)); // Output: false

linkedList.print(); // Output: 5 -> 15
