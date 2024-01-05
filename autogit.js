function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function quickSelect(arr, low, high, k) {
  if (low === high) { // Only one element in the array
    return arr[low];
  }
  
  const pivotIndex = partition(arr, low, high);
  if (k === pivotIndex) {
    return arr[k];
  } else if (k < pivotIndex) {
    return quickSelect(arr, low, pivotIndex - 1, k);
  } else {
    return quickSelect(arr, pivotIndex + 1, high, k);
  }
}

function findKthSmallest(arr, k) {
  if (k < 1 || k > arr.length) {
    return null;
  }
  
  return quickSelect(arr, 0, arr.length - 1, k - 1);
}

// Example usage
const array = [5, 3, 8, 2, 9, 1];
const k = 3;
console.log(`The ${k}th smallest element is: ${findKthSmallest(array, k)}`);
