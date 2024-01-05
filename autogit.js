function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Found the target, return the index
    }

    if (arr[mid] < target) {
      left = mid + 1; // Target is in the right half of the sorted array
    } else {
      right = mid - 1; // Target is in the left half of the sorted array
    }
  }

  return -1; // Target was not found
}

// Example usage:
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const targetNumber = 8;
const index = binarySearch(numbers, targetNumber);

if (index !== -1) {
  console.log(`Found at index ${index}`);
} else {
  console.log('Target number not found');
}
