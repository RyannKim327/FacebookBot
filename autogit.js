function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  // Create an array of single-item arrays
  let sortedArrays = array.map(item => [item]);

  // Merge pairs of arrays until there is only one sorted array left
  while (sortedArrays.length > 1) {
    let nextSortedArrays = [];

    // Merge pairs of arrays
    for (let i = 0; i < sortedArrays.length; i += 2) {
      let mergedArray = merge(sortedArrays[i], sortedArrays[i + 1]);
      nextSortedArrays.push(mergedArray);
    }

    sortedArrays = nextSortedArrays;
  }

  return sortedArrays[0];
}

function merge(left, right) {
  let mergedArray = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      mergedArray.push(left.shift());
    } else {
      mergedArray.push(right.shift());
    }
  }

  // Concatenate the remaining elements (if any) from left and right
  return mergedArray.concat(left).concat(right);
}

// Example usage:
const unsortedArray = [9, 4, 8, 2, 7, 1, 5, 3, 6];
console.log(mergeSort(unsortedArray)); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
