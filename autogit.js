function mergeSortIterative(array) {
  // Create an array of subarrays, each containing a single element.
  const subarrays = array.map(element => [element]);

  // While there is more than one subarray, merge the two smallest subarrays.
  while (subarrays.length > 1) {
    // Find the two smallest subarrays.
    let smallestIndex1 = 0;
    let smallestIndex2 = 1;
    for (let i = 2; i < subarrays.length; i++) {
      if (subarrays[i].length < subarrays[smallestIndex1].length) {
        smallestIndex2 = smallestIndex1;
        smallestIndex1 = i;
      } else if (subarrays[i].length < subarrays[smallestIndex2].length) {
        smallestIndex2 = i;
      }
    }

    // Merge the two smallest subarrays.
    subarrays[smallestIndex1] = merge(subarrays[smallestIndex1], subarrays[smallestIndex2]);

    // Remove the second subarray from the array of subarrays.
    subarrays.splice(smallestIndex2, 1);
  }

  // Return the merged subarray.
  return subarrays[0];
}

// Merge two sorted arrays into one sorted array.
function merge(array1, array2) {
  const mergedArray = [];
  let i = 0;
  let j = 0;

  // While there are elements in both arrays, compare the elements and add the smaller element to the merged array.
  while (i < array1.length && j < array2.length) {
    if (array1[i] < array2[j]) {
      mergedArray.push(array1[i]);
      i++;
    } else {
      mergedArray.push(array2[j]);
      j++;
    }
  }

  // Add the remaining elements of the first array to the merged array.
  while (i < array1.length) {
    mergedArray.push(array1[i]);
    i++;
  }

  // Add the remaining elements of the second array to the merged array.
  while (j < array2.length) {
    mergedArray.push(array2[j]);
    j++;
  }

  // Return the merged array.
  return mergedArray;
}
