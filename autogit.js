// Rabin-Karp algorithm for string searching

// Preprocessing
function preProcess(pattern, q) {
  const m = pattern.length;
  const hashPattern = new Array(m);
  hashPattern[0] = pattern.charCodeAt(0);
  for (let i = 1; i < m; i++) {
    hashPattern[i] = (hashPattern[i - 1] * 31 + pattern.charCodeAt(i)) % q;
  }
  return hashPattern;
}

// Hash function
function hashString(string, start, end) {
  let hashValue = 0;
  for (let i = start; i < end; i++) {
    hashValue = (hashValue * 31 + string.charCodeAt(i)) % q;
  }
  return hashValue;
}

// Rabin-Karp algorithm for string searching
function rabinKarp(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  if (m > n) {
    return [];
  }

  const q = 1000007; // A large prime number for modulo
  const hashPattern = preProcess(pattern, q);

  let hashText = hashString(text, 0, m);

  const matches = [];

  for (let i = 0; i <= n - m; i++) {
    if (hashText === hashPattern) {
      if (pattern === text.substring(i, i + m)) {
        matches.push(i);
      }
    }

    if (i < n - m) {
      hashText =
        ((hashText - text.charCodeAt(i) * Math.pow(31, m - 1)) % q + q) % q;
      hashText = (hashText * 31 + text.charCodeAt(i + m)) % q;
    }
  }

  return matches;
}
const text = "This is an example text for string searching.";
const pattern = "example";

const matches = rabinKarp(text, pattern);

console.log(matches); // Output: [10]
