function findKthSmallestElement(arr, k) {
  if (k < 1 || k > arr.length) {
    return null;
  }

  // Sort the array in non-decreasing order
  arr.sort((a, b) => a - b);

  // Return the kth smallest element
  return arr[k - 1];
}
const array = [7, 2, 1, 6, 8, 5, 3];
const k = 4;

const kthSmallestElement = findKthSmallestElement(array, k);
console.log(`The ${k}th smallest element is: ${kthSmallestElement}`);
