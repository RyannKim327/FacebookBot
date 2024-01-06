function buildTable(pattern) {
  let table = [0];
  let prefix = 0;
  
  for (let i = 1; i < pattern.length; i++) {
    if (pattern[i] === pattern[prefix]) {
      prefix++;
    } else {
      prefix = 0;
    }
    table[i] = prefix; 
  }
  
  return table;
}
function knuthMorrisPratt(text, pattern) {
  let table = buildTable(pattern);
  let positions = [];
  
  let textIndex = 0;
  let patternIndex = 0;
  
  while (textIndex < text.length) {
    if (pattern[patternIndex] === text[textIndex]) {
       if (patternIndex === pattern.length - 1) {
         positions.push(textIndex - pattern.length + 1);
         patternIndex = table[patternIndex];
       }
       patternIndex++;
       textIndex++;
    } else if (patternIndex > 0) {
      patternIndex = table[patternIndex - 1];
    } else {
      patternIndex = 0;
      textIndex++;
    }
  }
  
  return positions;
}
let text = "ABC ABCDAB ABCDABCDABDE";
let pattern = "ABCDABD";

let positions = knuthMorrisPratt(text, pattern);
console.log("Pattern found at positions:", positions);
Pattern found at positions: [15]
