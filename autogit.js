function boyerMooreSearch(text, pattern) {
  const textLength = text.length;
  const patternLength = pattern.length;

  // Generate the bad character skip table
  const bcTable = generateBCTable(pattern);

  let shift = 0;
  while (shift <= textLength - patternLength) {
    let mismatch = patternLength - 1;

    while (mismatch >= 0 && pattern[mismatch] === text[shift + mismatch]) {
      mismatch--;
    }

    if (mismatch < 0) {
      // Pattern found
      return shift;
    } else {
      const badChar = text[shift + mismatch];
      const lastOccurrence = bcTable[badChar] || -1;
      shift += Math.max(mismatch - lastOccurrence, 1);
    }
  }

  // Pattern not found
  return -1;
}

function generateBCTable(pattern) {
  const table = new Array(256).fill(-1);
  const patternLength = pattern.length;

  for (let i = 0; i < patternLength; i++) {
    table[pattern.charCodeAt(i)] = i;
  }

  return table;
}

// Example usage
const text = "Hello, world!";
const pattern = "world";

console.log(boyerMooreSearch(text, pattern)); // Output: 7
