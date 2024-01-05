function isPalindrome(str) {
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello')); // false
function isPalindrome(str) {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello')); // false
function isPalindrome(str, start = 0, end = str.length - 1) {
  if (start >= end) {
    return true;
  }
  if (str[start] !== str[end]) {
    return false;
  }
  return isPalindrome(str, start + 1, end - 1);
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello')); // false
function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello')); // false
function isPalindrome(str) {
  const reversedStr = parseInt(str.split('').reverse().join(''), 2);
  const originalStr = parseInt(str, 2);
  return reversedStr === originalStr;
}

console.log(isPalindrome('11001100')); // true
console.log(isPalindrome('10101011')); // false
