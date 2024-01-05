// Function to calculate factorial of a number using recursion
function factorial(n) {
  // Base case: factorial of 0 is 1
  if (n === 0) {
    return 1;
  }
  // Recursive case: calculate factorial by multiplying n with factorial of (n-1)
  else {
    return n * factorial(n - 1);
  }
}

// Example usage
const number = 5;
const result = factorial(number);
console.log(`Factorial of ${number} is: ${result}`);
Factorial of 5 is: 120
