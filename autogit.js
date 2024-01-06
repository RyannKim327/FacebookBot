function binarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // target value not found in the array
}

// Example usage:
const myArray = [1, 3, 6, 8, 12, 15, 24];
const targetValue = 8;

const index = binarySearch(myArray, targetValue);
if (index !== -1) {
  console.log("Element found at index", index);
} else {
  console.log("Element not found in the array");
}
