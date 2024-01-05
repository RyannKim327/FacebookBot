function isPrime(number) {
  if (number <= 1) {
    return false;
  }

  // Check for divisors up to the square root of the number
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}
console.log(isPrime(17));  // true
console.log(isPrime(21));  // false
console.log(isPrime(97));  // true
