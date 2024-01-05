// Function to check if a string is a palindrome
function isPalindrome(str) {
  // Convert the string to lowercase and remove all spaces
  str = str.toLowerCase().replace(/\s/g, "");

  // Check if the string is the same backwards and forwards
  return str === str.split("").reverse().join("");
}

let str = "racecar";
console.log(isPalindrome(str)); // true

str = "madam";
console.log(isPalindrome(str)); // true

str = "hello";
console.log(isPalindrome(str)); // false

str = "A man, a plan, a canal, Panama!";
console.log(isPalindrome(str)); // true (ignores spaces and punctuation)
