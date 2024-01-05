// Function to find the longest common substring of two strings
function longestCommonSubstring(str1, str2) {
  // Create a matrix to store the lengths of the longest common substrings
  // of the prefixes of str1 and str2
  let matrix = new Array(str1.length + 1).fill(0).map(() => new Array(str2.length + 1).fill(0));

  // Find the longest common substring
  let longestSubstring = "";
  let longestSubstringLength = 0;
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
        if (matrix[i][j] > longestSubstringLength) {
          longestSubstringLength = matrix[i][j];
          longestSubstring = str1.substring(i - longestSubstringLength, i);
        }
      }
    }
  }

  // Return the longest common substring
  return longestSubstring;
}
