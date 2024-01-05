// Recursive Function to calculate the factorial
function calculateFactorial(number) {
  if (number <= 1) {
    return 1; // Base case: factorial of 1 or less is 1
  } else {
    return number * calculateFactorial(number - 1); // Recursive case: multiply the number by the factorial of the number minus 1
  }
}

// Usage: Calculate the factorial of a number
const result = calculateFactorial(5);
console.log(`Factorial of 5 is ${result}`); // Output: Factorial of 5 is 120
