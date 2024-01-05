function isPrime(number) {
  // Check if the number is less than or equal to 1.
  if (number <= 1) {
    return false;
  }

  // Check if the number is divisible by any number from 2 to the square root of the number.
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  // If the number is not divisible by any number from 2 to the square root of the number, then it is a prime number.
  return true;
}
