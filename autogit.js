function largestPrimeFactor(number) {
  // Check if the number is valid
  if (number <= 1) {
    return "Invalid number";
  }

  // Check if the number is even
  if (number % 2 === 0) {
    // Divide the number by 2 until it is odd
    while (number % 2 === 0) {
      number /= 2;
    }
  }

  // Initialize the largest prime factor
  var largestPrimeFactor = 1;

  // Iterate from 3 to the square root of the number
  var divisor = 3;
  while (number > 1) {
    // Check if the divisor is a prime factor
    if (number % divisor === 0) {
      // Update the largest prime factor
      largestPrimeFactor = divisor;

      // Divide the number by the divisor
      number /= divisor;
    } else {
      // Increase the divisor by 2
      divisor += 2;
    }
  }

  // Return the largest prime factor
  return largestPrimeFactor;
}
var largestPrimeFactor = largestPrimeFactor(13195);
console.log(largestPrimeFactor); // 29
