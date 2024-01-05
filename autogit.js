function isAnagram(str1, str2) {
  // Remove non-alphabetic characters and convert to lowercase
  str1 = str1.replace(/[^a-z]/gi, '').toLowerCase();
  str2 = str2.replace(/[^a-z]/gi, '').toLowerCase();

  // Sort the strings alphabetically
  str1 = str1.split('').sort().join('');
  str2 = str2.split('').sort().join('');

  // Compare the sorted strings
  return str1 === str2;
}

// Example usage
console.log(isAnagram('rail safety', 'fairy tales')); // Output: true
console.log(isAnagram('hello', 'bye')); // Output: false
