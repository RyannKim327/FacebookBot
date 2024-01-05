function areAnagrams(string1, string2) {
  // removing spaces and converting to lowercase
  string1 = string1.replace(/\s/g, '').toLowerCase();
  string2 = string2.replace(/\s/g, '').toLowerCase();

  // sorting the strings
  const sortedString1 = string1.split('').sort().join('');
  const sortedString2 = string2.split('').sort().join('');

  // comparing the sorted strings
  return sortedString1 === sortedString2;
}

// example usage
console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('hello', 'world')); // false
