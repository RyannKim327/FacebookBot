// Function to find the longest increasing subsequence
function longestIncreasingSubsequence(arr) {
  if (arr.length === 0) {
    return [];
  }

  // Initialize the length of the longest increasing subsequence for each element
  const lengths = new Array(arr.length).fill(1);
  // Initialize the previous element in the longest increasing subsequence for each element
  const previous = new Array(arr.length).fill(-1);

  // Iterate over the array
  for (let i = 1; i < arr.length; i++) {
    // For each element, find the longest increasing subsequence ending at that element
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && lengths[i] < lengths[j] + 1) {
        lengths[i] = lengths[j] + 1;
        previous[i] = j;
      }
    }
  }

  // Find the index of the element with the longest increasing subsequence
  let maxIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (lengths[i] > lengths[maxIndex]) {
      maxIndex = i;
    }
  }

  // Reconstruct the longest increasing subsequence
  const longestSubsequence = [];
  while (maxIndex !== -1) {
    longestSubsequence.unshift(arr[maxIndex]);
    maxIndex = previous[maxIndex];
  }

  return longestSubsequence;
}

// Example usage
const arr = [3, 1, 4, 1, 5, 9, 2, 6];
const longestSubsequence = longestIncreasingSubsequence(arr);
console.log(longestSubsequence); // [1, 4, 5, 9]
