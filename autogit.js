function longestCommonSubsequence(str1, str2) {
  const m = str1.length;
  const n = str2.length;

  // Create a 2D array to store the lengths of common subsequences
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // Calculate the lengths of common subsequences
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Find the longest common subsequence by backtracking the dp array
  let i = m, j = n;
  const subsequence = [];
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      subsequence.unshift(str1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return subsequence.join('');
}
const str1 = 'ABCDGH';
const str2 = 'AEDFHR';
const lcs = longestCommonSubsequence(str1, str2);
console.log(lcs); // Output: ADH
