class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  dequeue() {
    if (!this.head) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    this.size--;
    if (!this.head) {
      this.tail = null;
    }
    return value;
  }

  isEmpty() {
    return this.size === 0;
  }

  getFront() {
    return this.head ? this.head.value : null;
  }

  getSize() {
    return this.size;
  }
}
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.getFront()); // Output: 1
console.log(queue.getSize()); // Output: 3

console.log(queue.dequeue()); // Output: 1

console.log(queue.getFront()); // Output: 2
console.log(queue.getSize()); // Output: 2

console.log(queue.isEmpty()); // Output: false
