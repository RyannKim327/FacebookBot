function kmp(text, pattern) {
  // Preprocess the pattern and build the LPS table
  const lps = buildLpsTable(pattern);

  // Initialize variables for pattern matching
  let i = 0; // Index in the text
  let j = 0; // Index in the pattern

  // Iterate over the text
  while (i < text.length) {
    // If the characters match, advance both indexes
    if (text[i] === pattern[j]) {
      i++;
      j++;

      // If we've reached the end of the pattern, we have a match
      if (j === pattern.length) {
        return i - j;
      }
    } else {
      // If the characters don't match, check if we can skip characters
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        // We've exhausted the pattern, move to the next character in the text
        i++;
      }
    }
  }

  // No match found
  return -1;
}

function buildLpsTable(pattern) {
  const lps = new Array(pattern.length);
  lps[0] = 0;

  let i = 1;
  let len = 0;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}
