const prime = 101;

function hash(str) {
  let hashValue = 0;
  for (let i = 0; i < str.length; i++) {
    hashValue = (hashValue * prime + str.charCodeAt(i)) % prime;
  }
  return hashValue;
}
function rabinKarp(pattern, text) {
  const patternHash = hash(pattern);
  const patternLength = pattern.length;
  const textLength = text.length;

  for (let i = 0; i <= textLength - patternLength; i++) {
    const substring = text.substring(i, i + patternLength);
    const substringHash = hash(substring);

    if (substringHash === patternHash && substring === pattern) {
      return i; // Return the index at which the pattern is found.
    }
  }

  return -1; // Return -1 if the pattern is not found.
}
const text = 'The quick brown fox jumps over the lazy dog';
const pattern = 'fox';

console.log(rabinKarp(pattern, text));  // Output: 16
