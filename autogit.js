function isAnagram(str1, str2) {
  // Step 1: Convert to lowercase
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  // Step 2: Remove non-alphabetic characters
  str1 = str1.replace(/[^a-z]/g, '');
  str2 = str2.replace(/[^a-z]/g, '');

  // Step 3: Sort the character arrays
  const sortedStr1 = str1.split('').sort().join('');
  const sortedStr2 = str2.split('').sort().join('');

  // Step 6: Compare the sorted strings
  return sortedStr1 === sortedStr2;
}

// Example usage:
console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('hello', 'hi')); // false
