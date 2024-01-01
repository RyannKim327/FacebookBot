function boyerMooreHorspool(text, pattern) {
  var m = pattern.length;
  var n = text.length;

  if (m > n) {
    return -1; // pattern is longer than the text, no match possible
  }

  // Preprocessing
  var skip = new Array(256).fill(m);
  for (var i = 0; i < m - 1; i++) {
    skip[pattern[i].charCodeAt()] = m - i - 1;
  }

  // Searching
  var i = 0;
  while (i <= n - m) {
    var j = m - 1;
    while (j >= 0 && pattern[j] === text[i + j]) {
      j--;
    }
    if (j < 0) {
      return i; // pattern found
    } else {
      i += skip[text[i + m].charCodeAt()];
    }
  }

  return -1; // pattern not found
}

// Example usage
var text = "Hello World";
var pattern = "World";

var index = boyerMooreHorspool(text, pattern);
if (index !== -1) {
  console.log("Pattern found at index", index);
} else {
  console.log("Pattern not found");
}
