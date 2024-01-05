// Boyer-Moore-Horspool algorithm for string searching

// Preprocessing
function preBmBc(pattern) {
  let bmBc = new Array(256).fill(-1); // Bad character table
  for (let i = 0; i < pattern.length; i++) {
    bmBc[pattern.charCodeAt(i)] = i;
  }
  return bmBc;
}

// String Searching
function bmHorspool(text, pattern) {
  let bmBc = preBmBc(pattern);
  let i = 0;
  let j = 0;

  while (i <= text.length - pattern.length) {
    j = pattern.length - 1;
    while (j >= 0 && pattern.charAt(j) == text.charAt(i + j)) {
      j--;
    }
    if (j < 0) {
      return i;
    } else {
      let charCode = text.charCodeAt(i + j);
      i += j - bmBc[charCode];
      if (bmBc[charCode] < 0) {
        i++;
      }
    }
  }
  return -1;
}

// Example usage
let text = "This is an example text for Boyer-Moore-Horspool algorithm.";
let pattern = "example";
let result = bmHorspool(text, pattern);

if (result >= 0) {
  console.log(`Pattern found at index ${result}.`);
} else {
  console.log("Pattern not found.");
}
