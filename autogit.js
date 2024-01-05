function isPrime(num) {
  // 1 and numbers less than 1 are not prime
  if (num <= 1) {
    return false;
  }

  // Check prime numbers from 2 to the square root of num
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      // num is divisible by i, so it's not prime
      return false;
    }
  }

  return true;
}

// Usage
console.log(isPrime(17)); // Output: true
console.log(isPrime(21)); // Output: false
