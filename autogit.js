// Boyer-Moore-Horspool algorithm for string searching

function bmhs(text, pattern) {
  // Build a bad character table
  const badcharTable = {};
  for (let i = 0; i < pattern.length - 1; i++) {
    badcharTable[pattern[i]] = pattern.length - i - 1;
  }

  // Search the text for the pattern
  let m = pattern.length;
  let n = text.length;
  let s = 0;  // shift of the pattern
  while (s <= n - m) {
    let j = m - 1;
    // Find a mismatch between the pattern and the text
    while (j >= 0 && pattern[j] === text[s + j]) {
      j--;
    }

    // If there is a mismatch, shift the pattern by the bad character rule
    if (j < 0) {
      // Pattern found
      return s;
    } else {
      let shift = Math.max(1, badcharTable[text[s + j]] || m);
      s += shift;
    }
  }

  // Pattern not found
  return -1;
}

// Example usage
const text = "Hello, world! This is a test.";
const pattern = "test";
const result = bmhs(text, pattern);

if (result === -1) {
  console.log("Pattern not found.");
} else {
  console.log(`Pattern found at index ${result}.`);
}
