// Rabin-Karp Algorithm for String Searching in JavaScript

// Calculate the hash value of a substring
function hash(substring, size) {
  let hashValue = 0;
  for (let i = 0; i < size; i++) {
    hashValue += substring.charCodeAt(i) * Math.pow(31, i);
  }
  return hashValue;
}

// Search for a pattern in a text using Rabin-Karp algorithm
function rabinKarp(text, pattern) {
  // Preprocess the pattern
  let patternHash = hash(pattern, pattern.length);

  // Generate hash values for every substring of size equal to pattern length
  let hashTable = [];
  for (let i = 0; i < text.length - pattern.length + 1; i++) {
    let substring = text.substring(i, i + pattern.length);
    let substringHash = hash(substring, pattern.length);
    hashTable.push(substringHash);
  }

  // Search for the pattern by comparing hash values
  let matches = [];
  for (let i = 0; i < hashTable.length; i++) {
    if (hashTable[i] === patternHash) {
      // Check if the substring is actually equal to the pattern
      if (text.substring(i, i + pattern.length) === pattern) {
        matches.push(i);
      }
    }
  }

  return matches;
}

// Example usage
const text = "AABAACAADAABAAABAA";
const pattern = "AABA";
const matches = rabinKarp(text, pattern);

console.log(`Matches found at indices: ${matches.join(', ')}`);
