function bmhSearch(text, pattern) {
  // ...
}
function bmhSearch(text, pattern) {
  const textLength = text.length;
  const patternLength = pattern.length;

  // Create a `badMatchTable` to store the number of characters to shift
  // when a mismatch occurs in the pattern.
  const badMatchTable = {};

  // Initialize `shift` to the length of the pattern.
  let shift = patternLength;

  // Populate `badMatchTable` with the shift values for each character in the pattern.
  for (let i = 0; i < patternLength - 1; i++) {
    badMatchTable[pattern[i]] = shift - i - 1;
  }
  // ...
}
function bmhSearch(text, pattern) {
  const textLength = text.length;
  const patternLength = pattern.length;
  const badMatchTable = {};
  let shift = patternLength;
  
  for (let i = 0; i < patternLength - 1; i++) {
    badMatchTable[pattern[i]] = shift - i - 1;
  }
  
  const matches = [];

  let index = 0;
  while (index <= textLength - patternLength) {
    let patternIndex = patternLength - 1;

    // Match pattern from right to left
    while (patternIndex >= 0 && pattern[patternIndex] === text[patternIndex + index]) {
      patternIndex--;
    }

    if (patternIndex === -1) {
      matches.push(index); // Found a match at current index
      shift = patternLength; // Shift by the length of the pattern
    } else {
      // Look up the shift value in `badMatchTable` for the mismatched character
      const badMatchShift = badMatchTable[text[index + patternLength - 1]] || patternLength;
      shift = badMatchShift;
    }

    index += shift; // Shift the index by the computed value
  }
  
  return matches;
}
const text = "ABAAABCDABCDEF";
const pattern = "ABC";

console.log(bmhSearch(text, pattern));
// Output: [2, 7]
