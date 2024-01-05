const numbers = [5, 2, 9, 1, 3, 7, 4, 6, 8];
numbers.sort((a, b) => a - b);
console.log(numbers); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
const sortedNumbers = numbers.slice().sort((a, b) => a - b);
