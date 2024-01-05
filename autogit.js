insert(value) {
  // Add the value to the end of the heap array
  this.heap.push(value);

  // Perform heapify-up operation to maintain the heap property
  this.heapifyUp(this.heap.length - 1);
}

// Heapify-up operation to maintain the heap property
heapifyUp(index) {
  while (index > 0) {
    // Calculate the parent index
    const parentIndex = Math.floor((index - 1) / 2);

    // If the parent value is greater than the child value, swap them
    if (this.heap[parentIndex] > this.heap[index]) {
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
    } else {
      // If the heap property is satisfied, stop the heapify-up operation
      break;
    }

    // Update the index to continue heapifying up the tree
    index = parentIndex;
  }
}
extractMin() {
  // Store the minimum value
  const minValue = this.heap[0];

  // Replace the root value with the last value in the heap array
  this.heap[0] = this.heap.pop();

  // Perform heapify-down operation to maintain the heap property
  this.heapifyDown(0);

  // Return the minimum value
  return minValue;
}

// Heapify-down operation to maintain the heap property
heapifyDown(index) {
  while (index < this.heap.length) {
    // Calculate the left and right child indices
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;

    // Find the smallest child index among the current node and its children
    let smallestChildIndex = index;
    if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestChildIndex]) {
      smallestChildIndex = leftChildIndex;
    }
    if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestChildIndex]) {
      smallestChildIndex = rightChildIndex;
    }

    // If the smallest child is not the current node, swap them
    if (smallestChildIndex !== index) {
      [this.heap[smallestChildIndex], this.heap[index]] = [this.heap[index], this.heap[smallestChildIndex]];
    } else {
      // If the heap property is satisfied, stop the heapify-down operation
      break;
    }

    // Update the index to continue heapifying down the tree
    index = smallestChildIndex;
  }
}
// Create a binary heap instance
const priorityQueue = new BinaryHeap();

// Insert values into the priority queue
priorityQueue.insert(5);
priorityQueue.insert(2);
priorityQueue.insert(3);
priorityQueue.insert(10);

// Extract and display the minimum value
console.log(priorityQueue.extractMin()); // 2

// Insert another value
priorityQueue.insert(8);

// Extract and display the minimum value
console.log(priorityQueue.extractMin()); // 3
