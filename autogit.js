function isPalindrome(str) {
  // Remove all non-alphanumeric characters from the string
  var alphanumericStr = str.replace(/[^0-9a-z]/gi, '');

  // Convert the string to lowercase
  var lowercaseStr = alphanumericStr.toLowerCase();

  // Reverse the lowercase string
  var reversedStr = lowercaseStr.split('').reverse().join('');

  // Check if the reversed string is equal to the original lowercase string
  return lowercaseStr === reversedStr;
}

// Test the function
var str1 = "A man, a plan, a canal, Panama"; // true
var str2 = "hello world"; // false

console.log(isPalindrome(str1)); // Output: true
console.log(isPalindrome(str2)); // Output: false
