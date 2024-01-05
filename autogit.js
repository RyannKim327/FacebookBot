// Function to find the median of two sorted arrays
function findMedianSortedArrays(arr1, arr2) {
  // Create a merged array of the two sorted arrays
  let mergedArr = [];
  let i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      mergedArr.push(arr1[i]);
      i++;
    } else {
      mergedArr.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    mergedArr.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    mergedArr.push(arr2[j]);
    j++;
  }

  // Find the median of the merged array
  let median;
  const halfLength = Math.floor(mergedArr.length / 2);
  if (mergedArr.length % 2 === 0) {
    median = (mergedArr[halfLength] + mergedArr[halfLength - 1]) / 2;
  } else {
    median = mergedArr[halfLength];
  }

  return median;
}

// Example usage
const arr1 = [1, 3, 5, 7, 9];
const arr2 = [2, 4, 6, 8, 10];
console.log(findMedianSortedArrays(arr1, arr2)); // Output: 5.5
