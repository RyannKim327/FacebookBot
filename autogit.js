function isAnagram(str1, str2) {
  return str1.toLowerCase().split('').sort().join('') === str2.toLowerCase().split('').sort().join('');
}
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  let charMap = new Map();

  for (let char of str1) {
    if (charMap.has(char)) {
      charMap.set(char, charMap.get(char) + 1);
    } else {
      charMap.set(char, 1);
    }
  }

  for (let char of str2) {
    if (!charMap.has(char) || charMap.get(char) === 0) {
      return false;
    } else {
      charMap.set(char, charMap.get(char) - 1);
    }
  }

  return true;
}
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  let charCounts = new Array(256).fill(0);

  for (let char of str1) {
    charCounts[char.charCodeAt(0)]++;
  }

  for (let char of str2) {
    if (charCounts[char.charCodeAt(0)] === 0) {
      return false;
    } else {
      charCounts[char.charCodeAt(0)]--;
    }
  }

  return true;
}
