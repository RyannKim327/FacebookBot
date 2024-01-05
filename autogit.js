function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const half = Math.floor(array.length / 2);
  const left = array.slice(0, half);
  const right = array.slice(half);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  return [...result, ...left, ...right];
}

// Example usage:
const array = [8, 4, 1, 7, 3, 5, 2, 6];
const sortedArray = mergeSort(array);
console.log(sortedArray);
