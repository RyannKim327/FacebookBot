function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random number between 1 and 10
let randomNumber = randomNumber(1, 10);

// Log the generated random number
console.log(randomNumber);
