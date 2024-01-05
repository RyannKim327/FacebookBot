// Selection sort algorithm implementation in JavaScript

// Function to sort an array using selection sort
function selectionSort(array) {
  // Loop through the array, starting from the first element
  for (let i = 0; i < array.length; i++) {
    // Set the current element as the minimum element
    let minIndex = i;

    // Loop through the remaining elements in the array
    for (let j = i + 1; j < array.length; j++) {
      // If the current element is greater than the minimum element, update the minimum element
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the current element with the minimum element
    let temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }

  // Return the sorted array
  return array;
}

// Example usage
const unsortedArray = [5, 3, 1, 2, 4];
const sortedArray = selectionSort(unsortedArray);
console.log(sortedArray); // Output: [1, 2, 3, 4, 5]
