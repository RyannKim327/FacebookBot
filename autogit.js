function findFirstRepeatedCharacter(str) {
  // Convert string to array of characters
  const charArray = str.split('');

  // Initialize hash table to store character counts
  const charCount = {};

  // Iterate over the array of characters
  for (let i = 0; i < charArray.length; i++) {
    const char = charArray[i];

    // Check if character is already in hash table
    if (charCount[char]) {
      return char; // Return the character as first repeated character
    } else {
      charCount[char] = 1; // Add character to hash table with count 1
    }
  }

  // No repeated character found
  return -1;
}

// Example usage
const str = 'hello world';
const result = findFirstRepeatedCharacter(str);
console.log(`First repeated character: ${result}`); // Output: 'l'
