function maxSubArraySum(arr) {
  let maxSoFar = -Infinity;
  let maxEndingHere = 0;

  for (let i = 0; i < arr.length; i++) {
    maxEndingHere = maxEndingHere + arr[i];
    if (maxSoFar < maxEndingHere) {
      maxSoFar = maxEndingHere;
    }
    if (maxEndingHere < 0) {
      maxEndingHere = 0;
    }
  }
  return maxSoFar;
}
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const maxSum = maxSubArraySum(arr);

console.log("Maximum sum subarray:", maxSum);
Maximum sum subarray: 6
