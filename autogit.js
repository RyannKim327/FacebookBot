function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    
    array[j + 1] = key;
  }

  return array;
}

// Example usage:
const unsortedArray = [4, 2, 6, 8, 1, 3, 5, 7];
const sortedArray = insertionSort(unsortedArray);
console.log(sortedArray);
