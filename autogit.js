function isPalindrome(s) {
  let start = 0;
  let end = s.length - 1;

  while (start < end) {
    if (s[start] !== s[end]) {
      return false;
    }
    start++;
    end--;
  }

  return true;
}

// Testing
console.log(isPalindrome("racecar")); // Output: true
console.log(isPalindrome("hello")); // Output: false
console.log(isPalindrome("level")); // Output: true
console.log(isPalindrome("madam")); // Output: true
console.log(isPalindrome("")); // Output: true (empty string is considered a valid palindrome)
