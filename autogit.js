class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Add a new node to the end of the list
  append(value) {
    const node = new Node(value);

    // If the list is empty, set the head and tail to the new node
    if (!this.head) {
      this.head = node;
      this.tail = node;
    // Otherwise, add the new node to the end of the list
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  // Remove the first node from the list
  removeHead() {
    if (!this.head) {
      return null;
    }

    const value = this.head.value;
    this.head = this.head.next;

    // If the list is now empty, set the tail to null
    if (!this.head) {
      this.tail = null;
    }

    return value;
  }

  // Search the list for a node with the given value
  find(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) {
        return current;
      }

      current = current.next;
    }

    return null;
  }

  // Print the values of all nodes in the list
  print() {
    let current = this.head;

    while (current) {
      console.log(current.value);

      current = current.next;
    }
  }
}

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.print(); // Output: 1 2 3

list.removeHead();
list.print(); // Output: 2 3

const node = list.find(3);
console.log(node.value); // Output: 3
