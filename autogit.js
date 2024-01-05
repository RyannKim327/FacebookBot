// Function to find the longest increasing subsequence
function longestIncreasingSubsequence(arr) {
  // Initialize the length of the longest increasing subsequence
  let maxLen = 1;

  // Create a table to store the lengths of the longest increasing subsequences ending at each index
  const lis = new Array(arr.length).fill(1);

  // Iterate over the array
  for (let i = 1; i < arr.length; i++) {
    // For each element, find the longest increasing subsequence ending at the previous index that is less than the current element
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && lis[i] < lis[j] + 1) {
        // Update the length of the longest increasing subsequence ending at the current index
        lis[i] = lis[j] + 1;

        // Update the maximum length of the longest increasing subsequence
        maxLen = Math.max(maxLen, lis[i]);
      }
    }
  }

  // Return the maximum length of the longest increasing subsequence
  return maxLen;
}

// Example: Find the longest increasing subsequence in the array [1, 2, 3, 4, 5, 6, 7, 8, 9]
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const maxLen = longestIncreasingSubsequence(arr);

console.log("The longest increasing subsequence in the array is:", maxLen); // Output: 9
