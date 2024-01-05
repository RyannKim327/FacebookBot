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

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  reverse() {
    let currentNode = this.head;
    let previousNode = null;

    while (currentNode) {
      const nextNode = currentNode.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.head = previousNode;
    this.tail = currentNode;

    return this.head;
  }
}

// Example Usage
const linkedList = new LinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.add(4);
linkedList.add(5);

console.log("Original Linked List:");
console.log(linkedList);

console.log("Reversed Linked List:");
console.log(linkedList.reverse());
