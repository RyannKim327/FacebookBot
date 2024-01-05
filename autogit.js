// Function to calculate the mean of a list of numbers
function mean(numbers) {
  // Check if the input is an array
  if (!Array.isArray(numbers)) {
    throw new Error("Input must be an array.");
  }

  // Check if the array is empty
  if (numbers.length === 0) {
    throw new Error("Input array cannot be empty.");
  }

  // Calculate the sum of the numbers
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  // Calculate the mean by dividing the sum by the number of elements
  let mean = sum / numbers.length;

  // Return the mean
  return mean;
}

// Example usage
let numbers = [1, 2, 3, 4, 5];
let result = mean(numbers);
console.log(`The mean of the numbers is: ${result}`);
