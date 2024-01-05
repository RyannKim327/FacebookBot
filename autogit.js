function binarySearch(array, target) {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let guess = array[mid];

    if (guess === target) {
      return mid;
    } else if (guess < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}
const array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

const target = 13;

const result = binarySearch(array, target);

console.log(result); // Output: 6
