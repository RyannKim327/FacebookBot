function longestIncreasingSubsequence(arr) {
  const n = arr.length;
  // Create an array to store the lengths of the longest increasing subsequences
  const dp = new Array(n).fill(1);

  // Initialize the longest increasing subsequence length as 1
  let maxLen = 1;

  // Initialize the last element index of the longest increasing subsequence as 0
  let lastIndex = 0;

  // Compute the lengths of the longest increasing subsequences
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
        dp[i] = dp[j] + 1;
        // Update the maximum length and last index of the longest increasing subsequence
        if (dp[i] > maxLen) {
          maxLen = dp[i];
          lastIndex = i;
        }
      }
    }
  }

  // Construct the longest increasing subsequence using the last index and lengths
  const lis = [];
  lis.push(arr[lastIndex]);

  // Traverse backwards and add elements to the subsequence if their length is one less than the previous element
  for (let i = lastIndex - 1; i >= 0; i--) {
    if (dp[i] === dp[lastIndex] - 1 && arr[i] < arr[lastIndex]) {
      lis.unshift(arr[i]);
      lastIndex = i;
    }
  }

  return lis;
}

// Example usage:
const arr = [3, 10, 2, 1, 20];
const lis = longestIncreasingSubsequence(arr);
console.log(lis); // Output: [3, 10, 20]
