// Function to generate a random array of numbers
function generateRandomArray(length) {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
}

// Function to sort the array using a random sort algorithm
function randomSort(array) {
  // Create a copy of the array to avoid modifying the original array
  const sortedArray = [...array];

  // Iterate over the array and randomly swap elements
  for (let i = 0; i < sortedArray.length; i++) {
    // Generate a random index to swap with
    const randomIndex = Math.floor(Math.random() * sortedArray.length);

    // Swap the elements at the current index and the random index
    const temp = sortedArray[i];
    sortedArray[i] = sortedArray[randomIndex];
    sortedArray[randomIndex] = temp;
  }

  // Return the sorted array
  return sortedArray;
}

// Test the randomSort function
const array = generateRandomArray(10);
console.log("Original array:", array);
const sortedArray = randomSort(array);
console.log("Sorted array:", sortedArray);
