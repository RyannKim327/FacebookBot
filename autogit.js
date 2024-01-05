function findFirstRepeatedChar(str) {
  const charMap = {};

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (charMap[char]) {
      return char;
    }

    charMap[char] = 1;
  }

  return null; // No repeated characters found
}

const str = "hello world";
const firstRepeatedChar = findFirstRepeatedChar(str);

console.log(firstRepeatedChar); // Output: l
