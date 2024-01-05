function findMedianSortedArrays(arr1, arr2) {
  const mergedArray = [...arr1, ...arr2].sort((a, b) => a - b);
  const len = mergedArray.length;
  const mid = Math.floor(len / 2);

  if (len % 2 !== 0) {
    return mergedArray[mid];
  } else {
    return (mergedArray[mid - 1] + mergedArray[mid]) / 2;
  }
}
