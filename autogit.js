function bmhSearch(text, pattern) {
  const shifts = [];

  // Preprocessing - finding the bad character shifts
  const patternLength = pattern.length;
  for (let i = 0; i < 256; i++) {
    shifts[i] = patternLength;
  }
  for (let i = 0; i < patternLength - 1; i++) {
    shifts[pattern.charCodeAt(i)] = patternLength - 1 - i;
  }

  // Searching - matching the pattern in the text
  let index = 0;
  const textLength = text.length;
  while (index <= textLength - patternLength) {
    let patternIndex = patternLength - 1;

    while (patternIndex >= 0 && pattern[patternIndex] === text[index + patternIndex]) {
      patternIndex--;
    }

    if (patternIndex === -1) {
      // Match found
      return index;
    } else {
      // Shift according to the bad character rule
      const badCharShift = shifts[text.charCodeAt(index + patternLength - 1)];
      index += badCharShift;
    }
  }

  // Match not found
  return -1;
}

// Example usage:
const text = 'The quick brown fox jumps over the lazy dog.';
const pattern = 'fox';
const index = bmhSearch(text, pattern);
if (index !== -1) {
  console.log(`Pattern found at index ${index}`);
} else {
  console.log('Pattern not found');
}
