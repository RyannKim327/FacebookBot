// Function to find the longest common prefix of an array of strings
function longestCommonPrefix(arr) {
  // If the array is empty, return an empty string
  if (arr.length === 0) {
    return "";
  }

  // Find the minimum length of all the strings in the array
  let minLength = arr[0].length;
  for (let i = 1; i < arr.length; i++) {
    minLength = Math.min(minLength, arr[i].length);
  }

  // Iterate over the characters in the minimum length string
  for (let i = 0; i < minLength; i++) {
    // Compare the character at the current index in all the strings
    let char = arr[0][i];
    for (let j = 1; j < arr.length; j++) {
      if (char !== arr[j][i]) {
        // If the character is not the same in all the strings, return the prefix up to the current index
        return arr[0].substring(0, i);
      }
    }
  }

  // If the loop completes without returning, all the strings have the same prefix, so return the minimum length string
  return arr[0].substring(0, minLength);
}
