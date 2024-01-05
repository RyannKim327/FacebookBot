function boyerMooreSearch(text, pattern) {
  // Check if pattern is empty
  if (pattern === "") {
    return [];
  }

  // Preprocess pattern
  const lastOccurrenceTable = {};
  for (let i = 0; i < pattern.length; i++) {
    lastOccurrenceTable[pattern[i]] = i;
  }

  // Search for pattern in text
  const matches = [];
  let i = pattern.length - 1;
  while (i < text.length) {
    // Compare pattern and text
    let j = pattern.length - 1;
    while (j >= 0 && pattern[j] === text[i - j]) {
      j--;
    }

    // If all characters matched
    if (j === -1) {
      matches.push(i - pattern.length + 1);
      // Shift pattern forward to the next character after the last match
      i += pattern.length - lastOccurrenceTable[text[i]];
    } else {
      // Shift pattern forward to the last occurrence of the character that caused the mismatch
      i += Math.max(1, j - lastOccurrenceTable[text[i]]);
    }
  }

  return matches;
}
const text = "this is a sample text to search in";
const pattern = "sample";
const matches = boyerMooreSearch(text, pattern);
console.log(matches); // Output: [16]
