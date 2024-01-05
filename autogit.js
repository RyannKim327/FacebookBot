function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    // Find the minimum element in the unsorted part of the array
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the minimum element with the first element of the unsorted part
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  return arr;
}
