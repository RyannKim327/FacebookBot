function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const alphanumericStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

  // Create the reversed version of the string
  const reversedStr = alphanumericStr.split('').reverse().join('');

  // Compare original string with the reversed string
  return alphanumericStr === reversedStr;
}

// Example usage
const str1 = "A man, a plan, a canal, Panama!";
console.log(isPalindrome(str1)); // Output: true

const str2 = "Hello world";
console.log(isPalindrome(str2)); // Output: false
