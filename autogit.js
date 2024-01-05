/**
 * Finds the longest common prefix of a set of strings.
 *
 * @param {string[]} strs The set of strings to search.
 * @return {string} The longest common prefix of the strings in strs.
 */
const longestCommonPrefix = (strs) => {
  // If the array is empty, return an empty string.
  if (strs.length === 0) {
    return "";
  }

  // Find the shortest string in the array.
  let shortestStr = strs[0];
  for (let i = 1; i < strs.length; i++) {
    if (strs[i].length < shortestStr.length) {
      shortestStr = strs[i];
    }
  }

  // Start comparing characters from the beginning of the shortest string.
  let prefix = "";
  for (let i = 0; i < shortestStr.length; i++) {
    // Check if all strings in the array have the same character at the current index.
    let char = shortestStr[i];
    let allSame = true;
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== char) {
        allSame = false;
        break;
      }
    }

    // If all strings have the same character at the current index, add it to the prefix.
    if (allSame) {
      prefix += char;
    } else {
      // If not, we've found the longest common prefix.
      break;
    }
  }

  return prefix;
};
