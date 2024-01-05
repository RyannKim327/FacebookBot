function isPalindrome(str) {
  // Convert the string to lowercase to avoid case-sensitive comparisons.
  str = str.toLowerCase();

  // Remove all non-alphanumeric characters from the string.
  str = str.replace(/[^a-z0-9]/g, "");

  // Check if the string is empty. If it is, then it is a palindrome.
  if (str === "") {
    return true;
  }

  // Check if the first and last characters of the string are the same.
  // If they are, then remove them from the string and continue checking the rest of the string.
  while (str.length > 1 && str[0] === str[str.length - 1]) {
    str = str.substring(1, str.length - 1);
  }

  // After the loop, if the string is empty or contains only one character, then it is a palindrome.
  return str.length === 0 || str.length === 1;
}

// Example usage:
const str1 = "racecar";
const str2 = "madam";
const str3 = "radar";
const str4 = "hello";

console.log(isPalindrome(str1)); // true
console.log(isPalindrome(str2)); // true
console.log(isPalindrome(str3)); // true
console.log(isPalindrome(str4)); // false
