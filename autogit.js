function isPrime(num) {
  // Check if num is less than or equal to 1, which is not prime
  if (num <= 1) {
    return false;
  }
  
  // Check if num is divisible by any number from 2 to the square root of num
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  
  // If num is not divisible by any number from 2 to the square root of num, it is prime
  return true;
}

// Usage example:
console.log(isPrime(17));  // Output: true
console.log(isPrime(24));  // Output: false
