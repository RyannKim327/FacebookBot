function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;
    
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    
    array[j + 1] = current;
  }
  
  return array;
}

// Test the insertionSort function
const unsortedArray = [5, 2, 8, 3, 1];
const sortedArray = insertionSort(unsortedArray);
console.log(sortedArray); // Output: [1, 2, 3, 5, 8]
