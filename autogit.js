function isPrime(num) {
  // Check if num is less than 2, as prime numbers are greater than 1
  if (num < 2) {
    return false;
  }

  // Iterate from 2 to the square root of num
  for (let i = 2; i <= Math.sqrt(num); i++) {
    // If num is divisible evenly by any number, it is not prime
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

// Example usage
console.log(isPrime(17)); // true
console.log(isPrime(15)); // false
