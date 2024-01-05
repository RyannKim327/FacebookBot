const string = "Hello, World!";

// Reverse the string using the reverse() method
const reversedString = string.reverse();

// Log the reversed string
console.log(reversedString);
!dlroW ,olleH
const string = "Hello, World!";

// Create an empty string to store the reversed string
let reversedString = "";

// Iterate over the string in reverse order
for (let i = string.length - 1; i >= 0; i--) {
  // Add the current character to the reversed string
  reversedString += string[i];
}

// Log the reversed string
console.log(reversedString);
!dlroW ,olleH
const string = "Hello, World!";

// Reverse the string using the reduce() method
const reversedString = string.split("").reduce((acc, char) => char + acc, "");

// Log the reversed string
console.log(reversedString);
!dlroW ,olleH
