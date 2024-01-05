const str = "Hello World!";

// Reverse the string using the reverse() method
const reversedStr = str.split(' ').reverse().join(' ');

console.log(reversedStr); // Output: "!dlroW olleH"
const str = "Hello World!";

// Initialize an empty string to store the reversed string
let reversedStr = "";

// Iterate over the string from the end to the beginning
for (let i = str.length - 1; i >= 0; i--) {
  // Add the current character to the reversed string
  reversedStr += str[i];
}

console.log(reversedStr); // Output: "!dlroW olleH"
const str = "Hello World!";

// Reverse the string using the reduce() method
const reversedStr = str.split(' ').reduce((acc, curr) => curr + ' ' + acc, '');

console.log(reversedStr); // Output: "!dlroW olleH"
