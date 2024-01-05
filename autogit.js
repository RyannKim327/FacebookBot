const string = "The quick brown fox jumps over the lazy dog.";
const word = "the";
const matches = string.match(new RegExp(word, "g"));
const count = matches.length;
console.log(`The word "${word}" occurs ${count} times in the string.`);
const string = "The quick brown fox jumps over the lazy dog.";
const word = "the";
const parts = string.split(word);
const count = parts.length - 1;
console.log(`The word "${word}" occurs ${count} times in the string.`);
const string = "The quick brown fox jumps over the lazy dog.";
const word = "the";
let count = 0;
let index = string.indexOf(word);
while (index !== -1) {
  count++;
  index = string.indexOf(word, index + 1);
}
console.log(`The word "${word}" occurs ${count} times in the string.`);
const string = "The quick brown fox jumps over the lazy dog.";
const word = "the";
const regex = new RegExp(word, "g");
let count = 0;
let match;
while ((match = regex.exec(string)) !== null) {
  count++;
}
console.log(`The word "${word}" occurs ${count} times in the string.`);
