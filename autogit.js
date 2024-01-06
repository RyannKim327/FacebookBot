function reverseWords(str) {
  // Step 1: Split the string into an array of words
  var words = str.split(' ');

  // Step 2: Reverse the array
  var reversedWords = words.reverse();

  // Step 3: Join the array back into a string
  var reversedString = reversedWords.join(' ');

  // Return the reversed string
  return reversedString;
}

// Example usage
var inputString = "Hello World";
var reversedString = reverseWords(inputString);
console.log(reversedString); // Output: "World Hello"
