class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  reverse() {
    let prev = null;
    let current = this.head;
    let next;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
  }

  print() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

const linkedList = new LinkedList();
linkedList.head = new Node(10);
linkedList.head.next = new Node(20);
linkedList.head.next.next = new Node(30);
linkedList.head.next.next.next = new Node(40);

console.log("Original Linked List:");
linkedList.print();

linkedList.reverse();

console.log("Reversed Linked List:");
linkedList.print();
