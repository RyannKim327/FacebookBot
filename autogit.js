function isAnagram(string1, string2) {
  // Convert both strings to lowercase and sort them alphabetically
  let sortedString1 = string1.toLowerCase().split('').sort().join('');
  let sortedString2 = string2.toLowerCase().split('').sort().join('');

  // Compare the sorted strings
  return sortedString1 === sortedString2;
}
console.log(isAnagram('hello', 'olleh')); // true
console.log(isAnagram('anagram', 'nag aram')); // true
console.log(isAnagram('javascript', 'scriptjava')); // true
console.log(isAnagram('dog', 'god')); // false
console.log(isAnagram('house', 'mouse')); // false
