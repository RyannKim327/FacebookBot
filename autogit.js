// Recursive function to calculate factorial of a number
function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Example usage
let number = 5;
let result = factorial(number);
console.log(`Factorial of ${number} is ${result}`);
