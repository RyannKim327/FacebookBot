function findFirstRepeatedCharacter(str) {
  const charMap = {}; // Hash table to store characters and their frequency

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (charMap[char]) {
      // If the character exists in the hash table, it's a repeat
      return char;
    } else {
      // Otherwise, add the character to the hash table
      charMap[char] = true;
    }
  }

  // If no repeated character is found, return null or any other relevant value
  return null;
}

const string = "hello world";
const repeatedChar = findFirstRepeatedCharacter(string);
console.log(repeatedChar); // Output: 'l'
