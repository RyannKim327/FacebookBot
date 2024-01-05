function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  return array;
}

const numbers = [5, 2, 8, 3, 1, 9, 4, 7, 6];
console.log(selectionSort(numbers)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
