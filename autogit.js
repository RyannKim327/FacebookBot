/*
Given two sorted arrays, find the median of the two sorted arrays.
The median is the middle value of an ordered dataset. 
It is the value that appears in the middle position in a sorted array.
If there is an even number of elements, then there are two middle values and the median is their average.
*/
const findMedian = (arr1, arr2) => {
  const mergedArr = mergeArrays(arr1, arr2);
  if (mergedArr.length === 0) {
    return 0;
  } else if (mergedArr.length === 1) {
    return mergedArr[0];
  } else if (mergedArr.length % 2 === 1) {
    return mergedArr[ Math.floor(mergedArr.length / 2)];
  } else {
    const middle1 = Math.floor((mergedArr.length - 1) / 2);
    const middle2 = middle1 + 1;
    return (mergedArr[middle1] + mergedArr[middle2]) / 2;
  }
};

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
  while (i < arr1.length) {
    mergedArr.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    mergedArr.push(arr2[j]);
    j++;
  }
  return mergedArr;
};
