function findLongestIncreasingSubsequence(arr) {
  const n = arr.length;
  // Initialize an array to store the length of the longest increasing subsequence ending at each index
  const lisLengths = Array(n).fill(1);

  // Compute the longest increasing subsequence for each index
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && lisLengths[i] < lisLengths[j] + 1) {
        lisLengths[i] = lisLengths[j] + 1;
      }
    }
  }

  // Find the maximum length from the lisLengths array
  let maxLength = 0;
  for (let i = 0; i < n; i++) {
    if (lisLengths[i] > maxLength) {
      maxLength = lisLengths[i];
    }
  }

  // Find the longest increasing subsequence using the lisLengths array
  let longestIncreasingSubsequence = [];
  for (let i = n - 1; i >= 0; i--) {
    if (lisLengths[i] === maxLength) {
      longestIncreasingSubsequence.unshift(arr[i]);
      maxLength--;
    }
  }

  return longestIncreasingSubsequence;
}

// Example usage:
const arr = [3, 4, -1, 0, 6, 2, 3];
const longestSubsequence = findLongestIncreasingSubsequence(arr);
console.log(longestSubsequence); // Output: [-1, 0, 2, 3]
