function findFirstRepeatedCharacter(str) {
  // Check if the string is empty
  if (!str || str.length === 0) {
    return null;
  }

  // Create a map to store the characters and their counts
  const charMap = {};

  // Iterate over the string
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    // Check if the character is already in the map
    if (charMap[char]) {
      // If the character is already in the map, return it
      return char;
    } else {
      // If the character is not in the map, add it to the map
      charMap[char] = 1;
    }
  }

  // If no repeated character is found, return null
  return null;
}
