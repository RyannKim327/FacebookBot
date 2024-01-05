function longestCommonPrefix(strings) {
  if (strings.length === 0) {
    return "";
  }

  strings.sort();

  const firstString = strings[0];
  let commonPrefix = "";

  for (let i = 0; i < firstString.length; i++) {
    const char = firstString[i];

    for (let j = 1; j < strings.length; j++) {
      if (strings[j][i] !== char) {
        return commonPrefix;
      }
    }

    commonPrefix += char;
  }

  return commonPrefix;
}

// Example Usage:
const strings = ['flower', 'flow', 'flight'];
console.log(longestCommonPrefix(strings)); // Output: "fl"

const strings2 = ['dog', 'racecar', 'car'];
console.log(longestCommonPrefix(strings2)); // Output: ""
