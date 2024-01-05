function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let middleIndex = Math.floor((start + end) / 2);
    let middleElement = arr[middleIndex];

    if (target === middleElement) {
      return middleIndex;
    } else if (target < middleElement) {
      end = middleIndex - 1;
    } else {
      start = middleIndex + 1;
    }
  }

  return -1; // Target not found
}

const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 15;

const result = binarySearch(arr, target);
if (result === -1) {
  console.log("Target not found.");
} else {
  console.log(`Target found at index ${result}.`);
}
