function reverseOrderOfWords(str) {
  var words = str.split(' ');
  var reversedWords = words.reverse();
  var reversedString = reversedWords.join(' ');
  return reversedString;
}

// Example usage
var sentence = "Hello, how are you today?";
var reversedSentence = reverseOrderOfWords(sentence);
console.log(reversedSentence);  // Output: "today? you are how Hello,"
