// Insertion sort algorithm implementation in JavaScript

function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let currentElement = array[i];
    let j = i - 1;

    while (j >= 0 && currentElement < array[j]) {
      array[j + 1] = array[j];
      j--;
    }

    array[j + 1] = currentElement;
  }

  return array;
}

// Example usage:

let unsortedArray = [5, 2, 8, 3, 1, 9, 4, 7, 6];
console.log("Unsorted array:", unsortedArray);

let sortedArray = insertionSort(unsortedArray);
console.log("Sorted array:", sortedArray);
