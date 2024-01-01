function binarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const midValue = array[middle];

    if (midValue === target) {
      return middle;
    } else if (midValue < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

// Test the binary search algorithm
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 6;
const index = binarySearch(arr, target);

if (index !== -1) {
  console.log(`Found ${target} at index ${index}`);
} else {
  console.log(`${target} was not found in the array`);
}
