function maxSubarraySum(arr) {
  let maxSum = -Infinity;
  let currentSum = 0;

  for (let i = 0; i < arr.length; i++) {
    // Add the current element to the running sum
    currentSum += arr[i];
    
    // If the running sum is greater than the maximum sum, update the maximum sum
    if (currentSum > maxSum) {
      maxSum = currentSum;
    }

    // If the running sum is negative, reset it to zero
    if (currentSum < 0) {
      currentSum = 0;
    }
  }

  return maxSum;
}

// Example usage:
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const maxSum = maxSubarraySum(arr);
console.log(maxSum);  // Output: 6
