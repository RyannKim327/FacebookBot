function isAnagram(string1, string2) {
  // Convert both strings to lowercase.
  string1 = string1.toLowerCase();
  string2 = string2.toLowerCase();

  // Sort the characters in each string alphabetically.
  string1 = string1.split('').sort().join('');
  string2 = string2.split('').sort().join('');

  // Compare the sorted strings.
  return string1 === string2;
}

// Test the function with different input strings.
console.log(isAnagram('hello', 'olleh')); // true
console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('dormitory', 'dirtyroom')); // true
console.log(isAnagram('cat', 'dog')); // false
