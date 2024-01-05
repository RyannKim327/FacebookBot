function selectionSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }
  }
  return array;
}
const array = [5, 3, 8, 2, 1, 4];
const sortedArray = selectionSort(array);
console.log(sortedArray); // Output: [1, 2, 3, 4, 5, 8]
