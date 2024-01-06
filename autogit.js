function shellSort(arr) {
  // ...
}
function getNextGap(gap) {
  return Math.floor((gap * 3 + 1) / 2);
}
function shellSort(arr) {
  const n = arr.length;
  let gap = 1;

  // Generate initial gap sequence
  while (gap < n / 3) {
    gap = getNextGap(gap);
  }

  // Start with the largest gap and reduce it
  for (; gap > 0; gap = getNextGap(gap)) {
    // Perform insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      // Shift earlier gap-sorted elements until the correct position for arr[i] is found
      for (; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }

      // Put arr[i] at its correct position
      arr[j] = temp;
    }
  }
    
  return arr;
}

const arr = [5, 9, 3, 1, 4, 6, 8, 2, 7];
console.log('Original array:', arr);

const sortedArr = shellSort(arr);
console.log('Sorted array:', sortedArr);
