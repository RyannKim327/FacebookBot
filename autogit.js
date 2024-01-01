const stringWithVowels = "Hello, World!";
const stringWithoutVowels = stringWithVowels.replace(/[aeiou]/gi, "");
console.log(stringWithoutVowels);
const stringWithVowels = "Hello, World!";
let stringWithoutVowels = "";
for (let i = 0; i < stringWithVowels.length; i++) {
  const letter = stringWithVowels[i].toLowerCase();
  if (letter !== "a" && letter !== "e" && letter !== "i" && letter !== "o" && letter !== "u") {
    stringWithoutVowels += stringWithVowels[i];
  }
}
console.log(stringWithoutVowels);
const stringWithVowels = "Hello, World!";
const stringWithoutVowels = Array.from(stringWithVowels).filter(letter => !"aeiouAEIOU".includes(letter)).join("");
console.log(stringWithoutVowels);
