function merge(left, right) {
  let result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Add any remaining elements from left or right subarrays
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}
function mergeSort(arr) {
  let arrayLength = arr.length;
  let tempArray = arr.map((item) => [item]);

  while (arrayLength > 1) {
    let currentIndex = 0;

    for (let i = 0; i < arrayLength; i += 2) {
      let mergedArray = merge(tempArray[i], tempArray[i + 1]);
      tempArray[currentIndex] = mergedArray;
      currentIndex++;
    }

    if (arrayLength % 2 !== 0) {
      tempArray[currentIndex] = tempArray[arrayLength - 1];
      currentIndex++;
    }

    arrayLength = currentIndex;
  }

  return tempArray[0];
}

// Usage example:
let unsortedArray = [8, 5, 2, 9, 5, 6, 3];
let sortedArray = mergeSort(unsortedArray);
console.log(sortedArray);
