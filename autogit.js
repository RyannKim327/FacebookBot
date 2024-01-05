function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  return merge(sortedLeft, sortedRight);
}

function merge(sortedLeft, sortedRight) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < sortedLeft.length && rightIndex < sortedRight.length) {
    if (sortedLeft[leftIndex] < sortedRight[rightIndex]) {
      result.push(sortedLeft[leftIndex]);
      leftIndex++;
    } else {
      result.push(sortedRight[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(sortedLeft.slice(leftIndex)).concat(sortedRight.slice(rightIndex));
}

// Example usage:
const unsortedArray = [5, 2, 6, 1, 3, 9];

const sortedArray = mergeSort(unsortedArray);
console.log(sortedArray); // Output: [1, 2, 3, 5, 6, 9]
