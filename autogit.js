function longestCommonPrefix(strings) {
  if (strings.length === 0) return "";
  if (strings.length === 1) return strings[0];
  
  strings.sort(); // Sort the strings in lexicographical order
  
  let commonPrefix = "";
  
  for (let i = 0; i < strings[0].length; i++) {
    const currentChar = strings[0][i];
    
    for (let j = 1; j < strings.length; j++) {
      if (strings[j][i] !== currentChar) {
        return commonPrefix;
      }
    }
    
    commonPrefix += currentChar;
  }
  
  return commonPrefix;
}
const set1 = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(set1)); // Output: "fl"

const set2 = ["dog", "racecar", "car"];
console.log(longestCommonPrefix(set2)); // Output: ""
