function getRandomNumber(min, max) {
  // The Math.random() function returns a random number between 0 (inclusive) and 1 (exclusive)
  // We multiply it by (max - min + 1) so that the range is inclusive of both min and max
  // Then we use the Math.floor() function to round down the number to the nearest integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage: generating a random number between 1 and 10
var randomNumber = getRandomNumber(1, 10);
console.log(randomNumber);
