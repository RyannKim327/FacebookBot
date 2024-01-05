function createKMPTable(pattern) {
  const table = Array(pattern.length).fill(0);

  let prefixIndex = 0;
  let suffixIndex = 1;

  while (suffixIndex < pattern.length) {
    if (pattern[prefixIndex] === pattern[suffixIndex]) {
      table[suffixIndex] = prefixIndex + 1;
      prefixIndex++;
      suffixIndex++;
    } else if (prefixIndex !== 0) {
      prefixIndex = table[prefixIndex - 1];
    } else {
      table[suffixIndex] = 0;
      suffixIndex++;
    }
  }

  return table;
}
function searchByText(text, pattern) {
  const table = createKMPTable(pattern);

  let textIndex = 0;
  let patternIndex = 0;
  const indexes = [];

  while (textIndex < text.length) {
    if (text[textIndex] === pattern[patternIndex]) {
      textIndex++;
      patternIndex++;
    }

    if (patternIndex === pattern.length) {
      indexes.push(textIndex - patternIndex);
      patternIndex = table[patternIndex - 1];
    } else if (textIndex < text.length && text[textIndex] !== pattern[patternIndex]) {
      if (patternIndex !== 0) {
        patternIndex = table[patternIndex - 1];
      } else {
        textIndex++;
      }
    }
  }

  return indexes;
}
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

const indexes = searchByText(text, pattern);

console.log(indexes); // Output: [10]
