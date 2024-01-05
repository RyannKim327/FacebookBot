function interpolationSearch(arr, value) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // Calculate the interpolation index
    let pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (value - arr[low]));

    // Check if the value is found at the interpolation index
    if (arr[pos] === value) {
      return pos;
    }

    // If the value is less than the value at the interpolation index, search in the left subarray
    else if (arr[pos] > value) {
      high = pos - 1;
    }

    // If the value is greater than the value at the interpolation index, search in the right subarray
    else {
      low = pos + 1;
    }
  }

  // Value not found
  return -1;
}
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const value = 11;

const index = interpolationSearch(arr, value);

if (index !== -1) {
  console.log(`Value ${value} found at index ${index}`);
} else {
  console.log(`Value ${value} not found in the array`);
}
Value 11 found at index 5
