function countCharacter(string, target) {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === target) {
      count++;
    }
  }
  return count;
}

console.log(countCharacter("Hello world", "l")); // 3
console.log(countCharacter("Mississippi", "s")); // 4
console.log(countCharacter("abracadabra", "a")); // 5
