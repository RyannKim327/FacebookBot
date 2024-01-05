function findKthSmallestElement(arr, k) {
  // Sort the array in ascending order
  arr.sort((a, b) => a - b);
  // Return the kth smallest element at index k-1
  return arr[k - 1];
}
function findKthSmallestElement(arr, k) {
  // Create a min-heap using Heap() or similar data structures
  const heap = new Heap();
  // Insert all elements of the array into the min-heap
  for (let i = 0; i < arr.length; i++) {
    heap.insert(arr[i]);
  }
  // Pop elements from the min-heap k times to get the kth smallest element
  for (let i = 0; i < k - 1; i++) {
    heap.extractMin();
  }
  // Return the minimum element at the top of the min-heap
  return heap.extractMin();
}
function findKthSmallestElement(arr, k) {
  // Select a pivot element
  const pivot = arr[Math.floor(arr.length / 2)];
  // Partition the array into two subarrays
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] > pivot) {
      right.push(arr[i]);
    }
  }
  // Recursively find the kth smallest element in the appropriate subarray
  if (k <= left.length) {
    return findKthSmallestElement(left, k);
  } else if (k > left.length + 1) {
    return findKthSmallestElement(right, k - left.length - 1);
  } else {
    return pivot;
  }
}
