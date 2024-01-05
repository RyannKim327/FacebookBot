function areAnagrams(string1, string2) {
  // Convert both strings to lowercase
  string1 = string1.toLowerCase();
  string2 = string2.toLowerCase();

  // Sort both strings alphabetically
  string1 = string1.split('').sort().join(''); // Convert to array, sort, join back to string
  string2 = string2.split('').sort().join('');

  // Compare the sorted strings
  return string1 === string2;
}
