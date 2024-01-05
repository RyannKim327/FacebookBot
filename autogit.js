function largestPrimeFactor(number) {
  // Find all the prime numbers up to the square root of the number
  var limit = Math.floor(Math.sqrt(number));
  var primes = [];
  for (var i = 2; i <= limit; i++) {
    var isPrime = true;
    for (var j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
  }

  // Find the largest prime factor of the number
  var largestPrimeFactor = 1;
  for (var i = 0; i < primes.length; i++) {
    if (number % primes[i] === 0) {
      largestPrimeFactor = primes[i];
    }
  }

  return largestPrimeFactor;
}

console.log(largestPrimeFactor(600851475143)); // 6857
