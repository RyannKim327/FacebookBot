function removeVowels(str) {
  return str.replace(/[aeiou]/gi, "");
}

console.log(removeVowels("Hello World")); // Hll Wrld
function removeVowels(str) {
  return str.split("").filter(function(char) {
    return !["a", "e", "i", "o", "u"].includes(char.toLowerCase());
  }).join("");
}

console.log(removeVowels("Hello World")); // Hll Wrld
function removeVowels(str) {
  return str.replace(/[^aeiou]/gi, "");
}

console.log(removeVowels("Hello World")); // Hll Wrld
