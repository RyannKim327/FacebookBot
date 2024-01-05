function findKthSmallest(array, k) {
  // Check if the input is valid
  if (!array || array.length < k || k <= 0) {
    return null;
  }

  // Sort the array in ascending order
  array.sort((a, b) => a - b);

  // Return the kth smallest element
  return array[k - 1];
}
const array = [5, 3, 8, 2, 1, 4];
const k = 3;

const kthSmallest = findKthSmallest(array, k);

console.log(`The ${k}th smallest element in the array is: ${kthSmallest}`);
The 3th smallest element in the array is: 3
