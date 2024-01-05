function interpolationSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // Calculate the position of the target value using interpolation
    let pos = Math.floor(low + (((high - low) / (arr[high] - arr[low])) * (target - arr[low])));

    // Check if the target value is at the interpolated position
    if (arr[pos] === target) {
      return pos;
    }

    // Determine which subarray to search next
    if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  // Target value not found
  return -1;
}
