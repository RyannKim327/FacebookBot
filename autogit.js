function findFirstNonRepeatingChar(str) {
  // Step 1: Create an object/map to store characters and their frequencies
  const charFrequency = {};

  // Step 2: Iterate through the string and update the frequency of each character
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    charFrequency[char] = charFrequency[char] ? charFrequency[char] + 1 : 1;
  }

  // Step 3: Iterate through the string and return the first character with frequency 1
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (charFrequency[char] === 1) {
      return char;
    }
  }

  // If no non-repeating character is found, return null or any default value
  return null;
}

// Example usage:
const inputString = 'abacabad';
const firstNonRepeatingChar = findFirstNonRepeatingChar(inputString);
console.log(firstNonRepeatingChar); // Output: 'c'
