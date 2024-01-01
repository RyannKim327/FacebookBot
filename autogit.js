function isAnagram(str1, str2) {
  // Remove whitespace and convert to lowercase
  str1 = str1.replace(/\s/g, '').toLowerCase();
  str2 = str2.replace(/\s/g, '').toLowerCase();

  // Convert strings to arrays, sort them, and convert back to strings
  const sortedStr1 = str1.split('').sort().join('');
  const sortedStr2 = str2.split('').sort().join('');

  // Compare the sorted strings
  return sortedStr1 === sortedStr2;
}

// Example usage
console.log(isAnagram('anagram', 'nagaram')); // Output: true
console.log(isAnagram('Hello', 'World')); // Output: false
console.log(isAnagram('listen', 'silent')); // Output: true
