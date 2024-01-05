// Function to perform insertion sort
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    // Move elements of array[0...i-1], that are greater than key,
    // to one position ahead of their current position
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }

    // Insert key at its correct position in sorted array
    array[j + 1] = key;
  }
}

// Testing the insertionSort function
let array = [5, 3, 1, 2, 4];
insertionSort(array);
console.log("Sorted array: ", array);
