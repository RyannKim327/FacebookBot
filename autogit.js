function longestCommonPrefix(strings) {
  if (strings.length === 0) {
    return "";
  }
  
  for (let i = 0; i < strings[0].length; i++) {
    const char = strings[0][i];
    
    for (let j = 1; j < strings.length; j++) {
      if (strings[j][i] !== char) {
        return strings[0].substring(0, i);
      }
    }
  }
  
  return strings[0];
}

// Example usage:
const strings = ["apple", "appy", "appease"];
console.log(longestCommonPrefix(strings)); // Output: "app"
