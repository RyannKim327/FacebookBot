class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null; // points to the front of the queue
    this.tail = null; // points to the end of the queue
  }
}
enqueue(data) {
  const newNode = new Node(data);
  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }
}
dequeue() {
  if (this.head === null) {
    return null; // queue is empty
  }
  const data = this.head.data;

  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = this.head.next;
  }

  return data;
}
peek() {
  if (this.head === null) {
    return null; // queue is empty
  }
  return this.head.data;
}
isEmpty() {
  return this.head === null;
}
size() {
  let count = 0;
  let current = this.head;
  while (current) {
    count++;
    current = current.next;
  }
  return count;
}
const queue = new Queue();

// Enqueue some items
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

// Dequeue an item
const dequeuedItem = queue.dequeue(); // dequeuedItem = 10

// Get the value of the front item without removing it
const peekedItem = queue.peek(); // peekedItem = 20

// Check if the queue is empty
const isEmpty = queue.isEmpty(); // isEmpty = false

// Get the number of items in the queue
const size = queue.size(); // size = 2

// Print the items in the queue
let current = queue.head;
while (current) {
  console.log(current.data); // 20, 30
  current = current.next;
}
