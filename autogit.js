// Define the swap function to swap two elements in an array
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Define the partition function to find the pivot element
function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
}

// Define the randomized partition function to find the pivot element randomly
function randomizedPartition(arr, low, high) {
  let randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
  swap(arr, randomIndex, high);
  return partition(arr, low, high);
}

// Define the quickSort function to sort the array using the Quick Sort algorithm
function quickSort(arr, low, high) {
  if (low < high) {
    let partitionIndex = randomizedPartition(arr, low, high);
    quickSort(arr, low, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, high);
  }
}

// Usage:
let arr = [10, 7, 8, 9, 1, 5];
quickSort(arr, 0, arr.length - 1);
console.log(arr); // [1, 5, 7, 8, 9, 10]
