function calculateFactorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  } else {
    let factorial = 1;
    for (let i = 2; i <= num; i++) {
      factorial *= i;
    }
    return factorial;
  }
}

// Example usage
console.log(calculateFactorial(5)); // Output: 120
