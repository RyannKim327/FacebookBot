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
  }
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
}
dequeue() {
  if (!this.head) {
    return null;
  }

  const dequeuedValue = this.head.value;
  this.head = this.head.next;

  if (!this.head) {
    this.tail = null;
  }

  return dequeuedValue;
}
peek() {
  if (!this.head) {
    return null;
  }

  return this.head.value;
}
