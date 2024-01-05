// Function to check if a string is a valid palindrome
function isPalindrome(str) {
  // Convert the string to lowercase and remove all non-alphanumeric characters
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Check if the cleaned string is the same forwards and backwards
  return cleanStr === cleanStr.split("").reverse().join("");
}

// Test the function with some example strings
const testStrings = ["racecar", "madam", "hello", "1221", "A man, a plan, a canal, Panama!"];

for (const testString of testStrings) {
  console.log(`${testString} is a palindrome: ${isPalindrome(testString)}`);
}
