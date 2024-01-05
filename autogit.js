function isPalindrome(str) {
  // Remove spaces and punctuation marks
  var cleanedStr = str.replace(/[\W_]/g, '');
  
  // Convert to lowercase
  cleanedStr = cleanedStr.toLowerCase();
  
  // Reverse the string
  var reversedStr = cleanedStr.split('').reverse().join('');

  // Compare the reversed string with the original
  if(cleanedStr === reversedStr) {
    return true;
  } else {
    return false;
  }
}

// Example usage
var string1 = "racecar";
console.log(isPalindrome(string1)); // Output: true

var string2 = "hello";
console.log(isPalindrome(string2)); // Output: false
