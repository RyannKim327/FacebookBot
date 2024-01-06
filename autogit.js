function reverseWords(str) {
  // Split the string into an array of words
  var words = str.split(' ');

  // Reverse the order of the words in the array
  words.reverse();

  // Join the words back into a string
  var reversedStr = words.join(' ');

  return reversedStr;
}

// Example usage
var originalStr = "Hello, world!";
var reversedStr = reverseWords(originalStr);
console.log(reversedStr); // Output: "world! Hello,"
