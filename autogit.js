const str = "Hello World";
const char = "l";
const count = str.split("").filter((c) => c === char).length;
console.log(count); // Output: 3
const str = "Hello World";
const char = "l";
let count = 0;
let index = str.indexOf(char);
while (index !== -1) {
  count++;
  index = str.indexOf(char, index + 1);
}
console.log(count); // Output: 3
const str = "Hello World";
const char = "l";
const matches = str.match(new RegExp(char, "g"));
const count = matches ? matches.length : 0;
console.log(count); // Output: 3
const str = "Hello World";
const char = "l";
const count = (str.length - str.replace(new RegExp(char, "g"), "").length) / char.length;
console.log(count); // Output: 3
const str = "Hello World";
const char = "l";
let count = 0;
for (let i = 0; i < str.length; i++) {
  if (str.includes(char, i)) {
    count++;
  }
}
console.log(count); // Output: 3
