function factorial(num) {
  // Base case: Factorial of 0 is 1
  if (num === 0) {
    return 1;
  }
  // Recursive case: Multiply num by the factorial of num-1
  else {
    return num * factorial(num - 1);
  }
}
