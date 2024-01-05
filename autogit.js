function findLCS(str1, str2) {
  // Create a 2D matrix to store the lengths of LCS
  const matrix = Array(str1.length + 1)
    .fill(0)
    .map(() => Array(str2.length + 1).fill(0));

  // Iterate through the strings
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        // The characters match, so increase the LCS length by 1
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        // The characters don't match, so take the maximum LCS length so far
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }

  // Extract the LCS from the matrix
  const lcs = [];
  let i = str1.length;
  let j = str2.length;

  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs.unshift(str1[i - 1]);
      i--;
      j--;
    } else if (matrix[i - 1][j] > matrix[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs.join('');
}

// Example usage:
const str1 = 'ABCDGH';
const str2 = 'AEDFHR';
const lcs = findLCS(str1, str2);
console.log(lcs); // Output: ADH
