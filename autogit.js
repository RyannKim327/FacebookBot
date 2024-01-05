const string = "The quick brown fox jumps over the lazy dog";
const word = "the";

// To make the search case-insensitive, use the "i" flag in the regular expression
const regex = new RegExp(word, "gi");

// Use the match method with the regex to get an array of matches
const matches = string.match(regex);

// Count the number of matches
const count = matches ? matches.length : 0;

console.log(`Number of occurrences of "${word}": ${count}`);
