function findLongestCommonPrefix(strs) {
  if (strs.length === 0) {
    return "";
  }

  // Find the shortest string in the array
  let shortestStr = strs[0];
  for (let i = 1; i < strs.length; i++) {
    if (strs[i].length < shortestStr.length) {
      shortestStr = strs[i];
    }
  }

  // Iterate over the characters in the shortest string
  for (let i = 0; i < shortestStr.length; i++) {
    // Check if all strings have the same character at the current position
    let char = shortestStr[i];
    let allSame = true;
    for (let j = 0; j < strs.length; j++) {
      if (strs[j][i] !== char) {
        allSame = false;
        break;
      }
    }

    // If all strings have the same character at the current position, add it to the longest common prefix
    if (allSame) {
      longestCommonPrefix += char;
    } else {
      // If not, return the longest common prefix so far
      return longestCommonPrefix;
    }
  }

  // If all characters in the shortest string are the same in all strings, return the entire shortest string as the longest common prefix
  return shortestStr;
}
