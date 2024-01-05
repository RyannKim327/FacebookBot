function calculateMean(numbers) {
  // Calculate the sum of the numbers
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  // Find the length of the list
  const length = numbers.length;

  // Calculate the mean
  const mean = sum / length;

  // Return the result
  return mean;
}

// Example usage
const numbers = [1, 2, 3, 4, 5];
const result = calculateMean(numbers);
console.log("The mean is:", result);
The mean is: 3
