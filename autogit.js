class BinaryHeap {
  constructor() {
    this.heap = [];
  }
}
insert(element) {
  this.heap.push(element);
  this.heapifyUp();
}
heapifyUp() {
  let index = this.heap.length - 1;
  let parentIndex = Math.floor((index - 1) / 2);

  while (index > 0 && this.heap[parentIndex] > this.heap[index]) {
    [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
    index = parentIndex;
    parentIndex = Math.floor((index - 1) / 2);
  }
}
extractMin() {
  if (this.isEmpty()) {
    return null;
  }

  let minElement = this.heap[0];
  this.heap[0] = this.heap[this.heap.length - 1];
  this.heap.pop();
  this.heapifyDown();

  return minElement;
}
heapifyDown() {
  let index = 0;
  let leftChildIndex = 2 * index + 1;
  let rightChildIndex = 2 * index + 2;

  while (leftChildIndex < this.heap.length) {
    let minIndex = index;

    if (this.heap[minIndex] > this.heap[leftChildIndex]) {
      minIndex = leftChildIndex;
    }

    if (rightChildIndex < this.heap.length && this.heap[minIndex] > this.heap[rightChildIndex]) {
      minIndex = rightChildIndex;
    }

    if (minIndex !== index) {
      [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
      index = minIndex;
      leftChildIndex = 2 * index + 1;
      rightChildIndex = 2 * index + 2;
    } else {
      break;
    }
  }
}
isEmpty() {
  return this.heap.length === 0;
}
