/**
 * Finds the longest increasing subsequence in an array in javascript.
 * @param {array} arr The array to search.
 * @returns {array} The longest increasing subsequence.
 */
function longestIncreasingSubsequence(arr) {
  if (arr === null || arr.length === 0) {
    return [];
  }

  // Create an array to store the lengths of the longest increasing subsequences ending at each index.
  const dp = Array(arr.length).fill(1);

  // Create an array to store the previous index in the longest increasing subsequence ending at each index.
  const prev = Array(arr.length).fill(-1);

  // Initialize the dp array and the prev array.
  dp[0] = 1;
  prev[0] = -1;

  // Find the longest increasing subsequence.
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
  }

  // Find the index of the last element in the longest increasing subsequence.
  let maxIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (dp[i] > dp[maxIndex]) {
      maxIndex = i;
    }
  }

  // Reconstruct the longest increasing subsequence.
  const lis = [];
  while (maxIndex !== -1) {
    lis.push(arr[maxIndex]);
    maxIndex = prev[maxIndex];
  }

  // Return the longest increasing subsequence.
  return lis.reverse();
}
