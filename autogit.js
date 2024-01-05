function longestCommonSubsequence(str1, str2) {
  // Create a matrix to store the lengths of the longest common subsequences of substrings of str1 and str2.
  let lcsMatrix = new Array(str1.length + 1).fill(0).map(() => new Array(str2.length + 1).fill(0));

  // Fill the matrix in a bottom-up manner.
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        lcsMatrix[i][j] = lcsMatrix[i - 1][j - 1] + 1;
      } else {
        lcsMatrix[i][j] = Math.max(lcsMatrix[i - 1][j], lcsMatrix[i][j - 1]);
      }
    }
  }

  // Get the length of the longest common subsequence.
  const lcsLength = lcsMatrix[str1.length][str2.length];

  // Construct the longest common subsequence.
  let lcs = "";
  let i = str1.length;
  let j = str2.length;
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs = str1[i - 1] + lcs;
      i--;
      j--;
    } else if (lcsMatrix[i - 1][j] > lcsMatrix[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}
