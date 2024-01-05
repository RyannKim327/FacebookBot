// Boyer-Moore string search algorithm in JavaScript

function boyerMoore(text, pattern) {
  // Preprocessing: Build a bad character table
  const badCharTable = {};
  for (let i = 0; i < pattern.length; i++) {
    badCharTable[pattern[i]] = i;
  }

  // Search for the pattern in the text
  let m = pattern.length;
  let n = text.length;
  let s = 0; // Shift amount
  while (s <= n - m) {
    // Compare the pattern with the current window in the text
    if (pattern === text.substring(s, s + m)) {
      return s; // Pattern found
    } else {
      // Shift the pattern based on bad character
      const char = text[s + m];
      s += Math.max(1, (s + m - badCharTable[char] || m));
    }
  }

  return -1; // Pattern not found
}

// Usage
const text = "This is an example of the Boyer-Moore algorithm.";
const pattern = "example";
const result = boyerMoore(text, pattern);

if (result === -1) {
  console.log("Pattern not found.");
} else {
  console.log(`Pattern found at position ${result}.`);
}
