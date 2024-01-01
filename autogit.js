function interpolationSearch(arr, target, start = 0, end = arr.length - 1) {
  if (arr[start] === target) {
    return start;
  }

  let position = Math.floor(start + ((target - arr[start]) * (end - start)) / (arr[end] - arr[start]));

  if (position < start || position > end || arr[position] !== target) {
    return -1;
  }

  if (arr[position] === target) {
    return position;
  }

  if (arr[position] > target) {
    return interpolationSearch(arr, target, start, position - 1);
  }

  if (arr[position] < target) {
    return interpolationSearch(arr, target, position + 1, end);
  }
}
const sortedArray = [1, 3, 5, 7, 9];
const targetElement = 5;
const result = interpolationSearch(sortedArray, targetElement);
console.log(`Index of the target element: ${result}`);
