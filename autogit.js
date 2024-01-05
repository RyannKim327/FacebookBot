/*
 Given two sorted arrays, find the median of the two arrays.

Example:
Input: [1, 3, 5] and [2, 4, 6]
Output: 3.5

Explanation:
The merged array is [1, 2, 3, 4, 5, 6], and the median is 3.5.

Constraints:
1 <= arr1.length, arr2.length <= 1000
0 <= arr1[i], arr2[i] <= 1000
*/
const findMedian = (arr1, arr2) => {
  // Check if the input arrays are valid.
  if (arr1 === null || arr1.length === 0 || arr2 === null || arr2.length === 0) {
    return null;
  }

  // Merge the two sorted arrays into a single sorted array.
  const mergedArr = mergeArrays(arr1, arr2);

  // If the length of the merged array is even, the median is the average of the two middle elements.
  if (mergedArr.length % 2 === 0) {
    const midIndex1 = Math.floor(mergedArr.length / 2) - 1;
    const midIndex2 = Math.floor(mergedArr.length / 2);
    return (mergedArr[midIndex1] + mergedArr[midIndex2]) / 2;
  }
  // If the length of the merged array is odd, the median is the middle element.
  else {
    const midIndex = Math.floor(mergedArr.length / 2);
    return mergedArr[midIndex];
  }
};

// Helper function to merge two sorted arrays into a single sorted array.
const mergeArrays = (arr1, arr2) => {
  const mergedArr = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      mergedArr.push(arr1[i]);
      i++;
    } else {
      mergedArr.push(arr2[j]);
      j++;
    }
  }

  // Add the remaining elements of the first array, if any.
  while (i < arr1.length) {
    mergedArr.push(arr1[i]);
    i++;
  }

  // Add the remaining elements of the second array, if any.
  while (j < arr2.length) {
    mergedArr.push(arr2[j]);
    j++;
  }

  return mergedArr;
};
