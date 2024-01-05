function countingSort(arr) {
  // Find the maximum value in the array
  let max = Math.max(...arr);

  // Create an array of zeros with a length equal to the maximum value + 1
  let counts = new Array(max + 1).fill(0);

  // Store the count of each element in the counts array
  for (let i = 0; i < arr.length; i++) {
    counts[arr[i]]++;
  }

  // Update the counts array to contain the cumulative count of each element
  for (let i = 1; i <= max; i++) {
    counts[i] += counts[i - 1];
  }

  // Create an array to store the sorted output
  let sortedArray = new Array(arr.length);

  // Place each element in its correct position in the sorted array
  for (let i = arr.length - 1; i >= 0; i--) {
    let element = arr[i];
    sortedArray[counts[element] - 1] = element;
    counts[element]--;
  }

  // Copy the sorted array back to the input array
  for (let i = 0; i < arr.length; i++) {
    arr[i] = sortedArray[i];
  }

  // Return the sorted array
  return arr;
}
