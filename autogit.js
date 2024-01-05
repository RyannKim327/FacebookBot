const word = "the";
const string = "The cat sat on the mat. The cat was very happy.";

const matches = string.match(new RegExp(word, "g"));

console.log(`The word "${word}" occurs ${matches.length} times in the string.`);
The word "the" occurs 4 times in the string.
const word = "the";
const string = "The cat sat on the mat. The cat was very happy.";

const substrings = string.split(word);

console.log(`The word "${word}" occurs ${substrings.length - 1} times in the string.`);
The word "the" occurs 4 times in the string.
const word = "the";
const string = "The cat sat on the mat. The cat was very happy.";

let index = string.indexOf(word);
let count = 0;

while (index !== -1) {
  count++;
  index = string.indexOf(word, index + 1);
}

console.log(`The word "${word}" occurs ${count} times in the string.`);
The word "the" occurs 4 times in the string.
const word = "the";
const string = "The cat sat on the mat. The cat was very happy.";

const count = string.replace(new RegExp(word, "g"), "").length;

console.log(`The word "${word}" occurs ${count} times in the string.`);
The word "the" occurs 4 times in the string.
const word = "the";
const string = "The cat sat on the mat. The cat was very happy.";

let count = 0;

for (let i = 0; i < string.length; i++) {
  if (string.includes(word, i)) {
    count++;
    i += word.length - 1;
  }
}

console.log(`The word "${word}" occurs ${count} times in the string.`);
The word "the" occurs 4 times in the string.
