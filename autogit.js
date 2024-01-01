function quicksort(array) {
  if (array.length <= 1) {
    return array;
  }
  
  const pivot = array[Math.floor(array.length / 2)];
  
  const lesser = [];
  const greater = [];
  const equal = [];
  for (let element of array) {
    if (element < pivot) {
      lesser.push(element);
    } else if (element > pivot) {
      greater.push(element);
    } else {
      equal.push(element);
    }
  }
  
  return quicksort(lesser).concat(equal, quicksort(greater));
}
const numbers = [3, 1, 7, 4, 2, 8, 5, 6];
const sortedNumbers = quicksort(numbers);
console.log(sortedNumbers); // [1, 2, 3, 4, 5, 6, 7, 8]
