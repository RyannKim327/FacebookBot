// Array of numbers
const numbers = [10, 5, 20, 15, 8];

// Method 1: Using spread operator
const max1 = Math.max(...numbers);
console.log(max1); // Output: 20

// Method 2: Using apply() method
const max2 = Math.max.apply(null, numbers);
console.log(max2); // Output: 20
