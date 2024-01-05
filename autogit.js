function binarySearch(arr, target, left, right) {
  // Check if the array is empty or the target is out of range
  if (left > right) {
    return -1;
  }

  // Calculate the middle index of the current range
  const mid = Math.floor((left + right) / 2);

  // Check if the target is equal to the middle element
  if (arr[mid] === target) {
    return mid;
  }

  // If the target is less than the middle element, search in the left half
  if (arr[mid] > target) {
    return binarySearch(arr, target, left, mid - 1);
  }

  // If the target is greater than the middle element, search in the right half
  if (arr[mid] < target) {
    return binarySearch(arr, target, mid + 1, right);
  }
}
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 13;
const index = binarySearch(arr, target, 0, arr.length - 1);

if (index === -1) {
  console.log("Target not found");
} else {
  console.log("Target found at index", index);
}
