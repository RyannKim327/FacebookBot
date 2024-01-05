// Calculate the factorial of a number using a recursive function
function factorial(number) {
  // Base case: factorial of 0 is 1
  if (number === 0) {
    return 1;
  }
  // Recursive case: calculate factorial by multiplying number by factorial of number-1
  else {
    return number * factorial(number - 1);
  }
}
// Calculate the factorial of 5
const result = factorial(5);
console.log(`The factorial of 5 is: ${result}`); // Output: The factorial of 5 is: 120
