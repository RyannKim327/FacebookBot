const string = "hello";
const charArray = string.split("");
const charCount = {};

charArray.forEach((char) => {
  if (charCount[char]) {
    charCount[char]++;
  } else {
    charCount[char] = 1;
  }
});
for (let i = 0; i < charArray.length; i++) {
  const char = charArray[i];
  if (charCount[char] === 1) {
    return char;
  }
}
return null;
const string = "hello";

const firstNonRepeatingChar = findFirstNonRepeatingChar(string);

console.log(firstNonRepeatingChar); // Output: "h"
