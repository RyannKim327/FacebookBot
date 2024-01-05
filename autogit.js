let str = "Hello, world!";
let reversedStr = str.reverse();

console.log(reversedStr); // !dlrow ,olleH
let str = "Hello, world!";
let reversedStr = str.split("").reverse().join("");

console.log(reversedStr); // !dlrow ,olleH
let str = "Hello, world!";
let reversedStr = "";

for (let i = str.length - 1; i >= 0; i--) {
  reversedStr += str[i];
}

console.log(reversedStr); // !dlrow ,olleH
let str = "Hello, world!";
let reversedStr = [...str].reverse().join("");

console.log(reversedStr); // !dlrow ,olleH
let str = "Hello, world!";
let reversedStr = str.split("").reduce((reversed, char) => char + reversed, "");

console.log(reversedStr); // !dlrow ,olleH
