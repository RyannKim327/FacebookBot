function mergeSort(array) {
  const length = array.length;
  
  // Create a new array to hold the sorted elements
  const sortedArray = new Array(length);
  
  // Iterate through each sublist size
  for (let sublistSize = 1; sublistSize < length; sublistSize *= 2) {
    // Merge adjacent sublists of size sublistSize
    for (let start = 0; start < length - sublistSize; start += 2 * sublistSize) {
      const mid = start + sublistSize - 1;
      const end = Math.min(start + 2 * sublistSize - 1, length - 1);
      
      merge(array, sortedArray, start, mid, end);
    }
  }
  
  return sortedArray;
}

function merge(array, sortedArray, start, mid, end) {
  let left = start;
  let right = mid + 1;
  
  // Iterate through the elements of the sublists
  for (let i = start; i <= end; i++) {
    // Check if left sublist is exhausted
    if (left > mid) {
      sortedArray[i] = array[right];
      right++;
    }
    // Check if right sublist is exhausted
    else if (right > end) {
      sortedArray[i] = array[left];
      left++;
    }
    // Compare the elements and merge them
    else if (array[left] < array[right]) {
      sortedArray[i] = array[left];
      left++;
    } else {
      sortedArray[i] = array[right];
      right++;
    }
  }
  
  // Copy the sorted elements back to the original array
  for (let i = start; i <= end; i++) {
    array[i] = sortedArray[i];
  }
}

// Example usage:
const array = [5, 10, 3, 8, 2, 7, 1, 6, 9, 4];
const sortedArray = mergeSort(array);
console.log(sortedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
