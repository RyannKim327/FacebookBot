array.splice(index, numElementsToRemove);
const myArray = ['a', 'b', 'c', 'd', 'e'];

// Remove the element at index 2
myArray.splice(2, 1); // ['a', 'b', 'd', 'e']

// Remove two elements starting from index 1
myArray.splice(1, 2); // ['a', 'd', 'e']
array.filter((element, index, array) => {
  // Return true to keep the element, false to remove it
});
// Create an array of numbers
const myArray = [1, 2, 3, 4, 5];

// Remove all numbers greater than 3
const filteredArray = myArray.filter((element) => element <= 3); // [1, 2, 3]
array.pop();
// Create an array of strings
const myArray = ['a', 'b', 'c'];

// Remove the last element
const poppedElement = myArray.pop(); // 'c'

// The array now contains only 'a' and 'b'
array.shift();
// Create an array of numbers
const myArray = [1, 2, 3];

// Remove the first element
const shiftedElement = myArray.shift(); // 1

// The array now contains only 2 and 3
