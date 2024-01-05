function heapSort(arr) {
  // Build a max heap.
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }

  // Sort the heap.
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap the root with the last element.
    heapify(arr, 0, i); // Heapify the remaining elements.
  }

  return arr;
}

function heapify(arr, i, n) {
  // Left child index.
  const left = 2 * i + 1;

  // Right child index.
  const right = 2 * i + 2;

  // Largest element index.
  let largest = i;

  // If the left child is larger than the parent.
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If the right child is larger than the largest element.
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If the largest element is not the parent.
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap the parent with the largest element.
    heapify(arr, largest, n); // Recursively heapify the subtree.
  }
}
