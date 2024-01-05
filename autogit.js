function factorial(n) {
  // Base case: 0! = 1
  if (n === 0) {
    return 1;
  }
  
  // Recursive call: n! = n * (n-1)!
  return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5)); // Output: 120
