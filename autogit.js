function rabinkarpSearch(text, pattern) {
  // Set some constants
  const d = 256; // Number of characters in the alphabet
  const q = 101; // A prime number for modular arithmetic

  // Preprocess the pattern string
  const patternHash = rabinkarpHash(pattern, d, q);

  // Generate rolling hash values for the text string
  let windowHash;
  for (let i = 0; i <= text.length - pattern.length; i++) {
    // Calculate the rolling hash for the current window
    if (i === 0) {
      windowHash = rabinkarpHash(text.substring(i, i + pattern.length), d, q);
    } else {
      windowHash = ((windowHash - text.charCodeAt(i - 1) * pow) * d + text.charCodeAt(i + pattern.length - 1)) % q;
      if (windowHash < 0) { windowHash += q; }
    }

    // Compare the hash values
    if (windowHash === patternHash) {
      // Check if the characters match as well
      if (text.substring(i, i + pattern.length) === pattern) {
        return {found: true, index: i};
      }
    }
  }

  // Return the result
  return {found: false, index: -1};
}
