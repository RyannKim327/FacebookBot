function longestCommonSubstring(str1, str2) {
  // Create a matrix to store the lengths of the longest common substrings of the prefixes of str1 and str2
  const matrix = new Array(str1.length + 1).fill(0).map(() => new Array(str2.length + 1).fill(0));

  // Initialize the first row and column of the matrix to 0
  for (let i = 0; i <= str1.length; i++) {
    matrix[i][0] = 0;
  }
  for (let j = 0; j <= str2.length; j++) {
    matrix[0][j] = 0;
  }

  // Fill the matrix using dynamic programming
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = 0;
      }
    }
  }

  // Find the maximum value in the matrix to determine the length of the longest common substring
  let max = 0;
  let maxI = 0;
  let maxJ = 0;
  for (let i = 0; i <= str1.length; i++) {
    for (let j = 0; j <= str2.length; j++) {
      if (matrix[i][j] > max) {
        max = matrix[i][j];
        maxI = i;
        maxJ = j;
      }
    }
  }

  // Construct the longest common substring using the matrix
  return str1.substring(maxI - max, maxI);
}
