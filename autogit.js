function factorial(n) {
  // Base case: factorial of 0 is 1
  if (n === 0) {
    return 1;
  }

  // Recursive case: multiply n with factorial of n-1
  return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5)); // Output: 120
