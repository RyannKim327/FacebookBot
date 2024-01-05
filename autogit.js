// Function to return the largest prime factor of a given number
function largestPrimeFactor(number) {
  // Check if the number is valid
  if (number <= 1) {
    return "Invalid number";
  }

  // Initialize the largest prime factor
  var largestPrimeFactor = 1;

  // Iterate through all numbers from 2 to the square root of the given number
  for (var i = 2; i <= Math.sqrt(number); i++) {
    // Check if i is a prime number
    if (isPrime(i)) {
      // Check if i divides the given number
      if (number % i === 0) {
        // Update the largest prime factor
        largestPrimeFactor = i;

        // Divide the number by i
        number /= i;

        // Repeat the process until the number becomes 1
        while (number % i === 0) {
          number /= i;
        }
      }
    }
  }

  // If the number is greater than 1, then it is itself a prime number
  if (number > 1) {
    largestPrimeFactor = number;
  }

  // Return the largest prime factor
  return largestPrimeFactor;
}

// Function to check if a given number is prime
function isPrime(number) {
  // If the number is 1, it is not prime
  if (number == 1) {
    return false;
  }

  // Iterate through all numbers from 2 to the square root of the given number
  for (var i = 2; i <= Math.sqrt(number); i++) {
    // Check if the number is divisible by any number from 2 to its square root
    if (number % i === 0) {
      return false;
    }
  }

  // If the number is not divisible by any number from 2 to its square root, it is prime
  return true;
}

// Example usage
var number = 600851475143;
var largestPrimeFactor = largestPrimeFactor(number);
console.log("The largest prime factor of", number, "is", largestPrimeFactor);
