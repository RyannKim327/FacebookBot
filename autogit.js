function buildPrefixTable(pattern) {
  const prefixTable = new Array(pattern.length);
  let length = 0;
  let i = 1;
  prefixTable[0] = 0;

  while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
      length++;
      prefixTable[i] = length;
      i++;
    } else {
      if (length !== 0) {
        length = prefixTable[length - 1];
      } else {
        prefixTable[i] = 0;
        i++;
      }
    }
  }

  return prefixTable;
}
function kmpSearch(text, pattern) {
  const prefixTable = buildPrefixTable(pattern);
  const indices = [];
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      j++;
      i++;
    }

    if (j === pattern.length) {
      indices.push(i - j);
      j = prefixTable[j - 1];
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = prefixTable[j - 1];
      } else {
        i++;
      }
    }
  }

  return indices;
}
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
const indices = kmpSearch(text, pattern);

console.log(`The pattern '${pattern}' is found at indices: ${indices}`);
