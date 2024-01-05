function firstNonRepeatingCharacter(string) {
  // Create an object to store the count of each character in the string
  const charCount = {};

  // Iterate over the string and increment the count of each character
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    charCount[char] = charCount[char] ? charCount[char] + 1 : 1;
  }

  // Iterate over the object and find the first character with a count of 1
  for (let char in charCount) {
    if (charCount[char] === 1) {
      return char;
    }
  }

  // Return null if no non-repeating character is found
  return null;
}

console.log(firstNonRepeatingCharacter("hello")); // "h"
console.log(firstNonRepeatingCharacter("leetcode")); // "l"
console.log(firstNonRepeatingCharacter("aabbccdd")); // null
