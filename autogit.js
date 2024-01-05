function findFirstNonRepeatingChar(str) {
  const charFreqMap = {};

  // Loop through the string to create the character frequency map
  for (let char of str) {
    charFreqMap[char] = (charFreqMap[char] || 0) + 1;
  }

  // Loop through the string again to find the first non-repeating character
  for (let char of str) {
    if (charFreqMap[char] === 1) {
      return char;
    }
  }

  // No non-repeating character found
  return null;
}

// Example usage:
const str = "aabbccdeeffg";
const firstNonRepeatingChar = findFirstNonRepeatingChar(str);
console.log(firstNonRepeatingChar); // Output: "d"
