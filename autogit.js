const numbers = [5, 2, 9, 1, 3, 8, 4, 7, 6];

// Sort the numbers in ascending order
numbers.sort((a, b) => a - b);

// Print the sorted array
console.log(numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
const numbers = [5, 2, 9, 1, 3, 8, 4, 7, 6];

// Define a custom sorting function
const compareNumbers = (a, b) => {
  return a - b;
};

// Sort the numbers using the custom sorting function
numbers.sort(compareNumbers);

// Print the sorted array
console.log(numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
const numbers = [5, 2, 9, 1, 3, 8, 4, 7, 6];

// Sort the numbers in ascending order using a comparison function
numbers.sort(function(a, b) {
  return a - b;
});

// Print the sorted array
console.log(numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
const numbers = [5, 2, 9, 1, 3, 8, 4, 7, 6];

// Sort the numbers in ascending order using an arrow function
numbers.sort((a, b) => a - b);

// Print the sorted array
console.log(numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
