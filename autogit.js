function lcs(str1, str2) {
  // Create the DP table
  const dp = new Array(str1.length + 1).fill(0).map(() => new Array(str2.length + 1).fill(0));

  // Initialize the first row and column to 0
  for (let i = 0; i <= str1.length; i++) {
    dp[i][0] = 0;
  }
  for (let j = 0; j <= str2.length; j++) {
    dp[0][j] = 0;
  }

  // Iterate over the DP table
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] == str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Reconstruct the LCS
  let lcs = "";
  let i = str1.length;
  let j = str2.length;
  while (i > 0 && j > 0) {
    if (str1[i - 1] == str2[j - 1]) {
      lcs = str1[i - 1] + lcs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}
const str1 = "ABCDGH";
const str2 = "AEDFHR";

const lcs = lcs(str1, str2);

console.log(lcs); // Output: "ADH"
