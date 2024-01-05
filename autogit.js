function interpolationSearch(arr, value, start = 0, end = arr.length - 1) {
  // ...
}
function interpolationSearch(arr, value, start = 0, end = arr.length - 1) {
  if (arr.length === 0 || start > end) {
    return -1;
  }
  // ...
}
function interpolationSearch(arr, value, start = 0, end = arr.length - 1) {
  if (arr.length === 0 || start > end) {
    return -1;
  }

  // Calculate the position using interpolation formula
  const pos = Math.floor(start + ((end - start) / (arr[end] - arr[start])) * (value - arr[start]));
  // ...
}
function interpolationSearch(arr, value, start = 0, end = arr.length - 1) {
  if (arr.length === 0 || start > end) {
    return -1;
  }

  const pos = Math.floor(start + ((end - start) / (arr[end] - arr[start])) * (value - arr[start]));

  if (pos < start || pos > end) {
    return -1;
  }

  if (arr[pos] === value) {
    return pos;
  }
  // ...
}
function interpolationSearch(arr, value, start = 0, end = arr.length - 1) {
  if (arr.length === 0 || start > end) {
    return -1;
  }

  const pos = Math.floor(start + ((end - start) / (arr[end] - arr[start])) * (value - arr[start]));

  if (pos < start || pos > end) {
    return -1;
  }

  if (arr[pos] === value) {
    return pos;
  }

  if (arr[pos] < value) {
    return interpolationSearch(arr, value, pos + 1, end);
  }

  if (arr[pos] > value) {
    return interpolationSearch(arr, value, start, pos - 1);
  }
}
const myArray = [1, 3, 5, 7, 9];
const target = 7;
const result = interpolationSearch(myArray, target);

if (result !== -1) {
  console.log(`Element ${target} is found at index ${result}`);
} else {
  console.log(`Element ${target} is not found in the array`);
}
