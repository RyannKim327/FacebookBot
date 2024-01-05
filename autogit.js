const string = "Racecar";
const lowercaseString = string.toLowerCase();
const regex = /[^a-zA-Z0-9]/g;
const cleanedString = lowercaseString.replace(regex, "");
const reversedString = cleanedString.split("").reverse().join("");
const isPalindrome = cleanedString === reversedString;
function isPalindrome(string) {
  const lowercaseString = string.toLowerCase();
  const regex = /[^a-zA-Z0-9]/g;
  const cleanedString = lowercaseString.replace(regex, "");
  const reversedString = cleanedString.split("").reverse().join("");
  const isPalindrome = cleanedString === reversedString;
  return isPalindrome;
}

const string1 = "Racecar";
const string2 = "madam";
const string3 = "hello";

console.log(isPalindrome(string1)); // true
console.log(isPalindrome(string2)); // true
console.log(isPalindrome(string3)); // false
