// Quick Sort Algorithm

// Step 1: Pick a pivot element
// Step 2: Partition the array around the pivot element
// Step 3: Recursively sort the two subarrays

// Function to partition the array around the pivot element
function partition(arr, start, end) {
  let pivot = arr[end];
  let i = start - 1;

  for (let j = start; j < end; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
  return i + 1;
}

// Function to sort the array using quick sort
function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }

  let pivotIndex = partition(arr, start, end);

  quickSort(arr, start, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, end);
}

// Example array
let arr = [10, 7, 8, 9, 1, 5];

// Sort the array using quick sort
quickSort(arr, 0, arr.length - 1);

// Print the sorted array
console.log(arr); // Output: [1, 5, 7, 8, 9, 10]
