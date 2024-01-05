function longestCommonSubstring(str1, str2) {
  let len1 = str1.length;
  let len2 = str2.length;
  let longestSubstring = "";
  let start = 0;
  let end = 0;
  let maxLen = 0;

  // Create a 2D matrix to store the lengths of the longest common substrings of substrings of str1 and str2
  let lcsMatrix = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0));

  // Iterate over the rows of the matrix
  for (let i = 1; i <= len1; i++) {
    // Iterate over the columns of the matrix
    for (let j = 1; j <= len2; j++) {
      // If the characters at the current positions in str1 and str2 are the same
      if (str1[i - 1] === str2[j - 1]) {
        // Update the length of the longest common substring
        lcsMatrix[i][j] = lcsMatrix[i - 1][j - 1] + 1;

        // If the current length is greater than the maximum length so far
        if (lcsMatrix[i][j] > maxLen) {
          // Update the maximum length
          maxLen = lcsMatrix[i][j];

          // Update the starting and ending indices of the longest common substring
          start = i - maxLen;
          end = i;
        }
      }
    }
  }

  // Extract the longest common substring from str1
  longestSubstring = str1.substring(start, end);

  return longestSubstring;
}
console.log(longestCommonSubstring("ABCDGH", "ACDGHR")); // "CDGH"
console.log(longestCommonSubstring("ABCDE", "ABFDE")); // "AB"
console.log(longestCommonSubstring("ABCDEF", "FABCDE")); // "ABCDE"
console.log(longestCommonSubstring("ABCD", "EFGH")); // ""
