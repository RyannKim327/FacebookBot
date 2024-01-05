// Function to remove all vowels from a string
function removeVowels(str) {
  // Create an empty string to store the result
  let result = "";

  // Iterate over each character in the input string
  for (let i = 0; i < str.length; i++) {
    // Check if the current character is a vowel
    if (
      str[i] === "a" ||
      str[i] === "e" ||
      str[i] === "i" ||
      str[i] === "o" ||
      str[i] === "u" ||
      str[i] === "A" ||
      str[i] === "E" ||
      str[i] === "I" ||
      str[i] === "O" ||
      str[i] === "U"
    ) {
      // If it is a vowel, skip it and move to the next character
      continue;
    } else {
      // If it is not a vowel, append it to the result string
      result += str[i];
    }
  }

  // Return the result string
  return result;
}

// Test the function with a sample string
const str = "Hello, World!";
const result = removeVowels(str);

console.log(result); // Output: "Hll, Wrld!"
