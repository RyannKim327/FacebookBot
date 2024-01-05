function countingSort(arr, maxValue) {
  // Create an array to store the count of each number
  const countArray = new Array(maxValue + 1).fill(0);

  // Count the occurrences of each number in the input array
  for (let i = 0; i < arr.length; i++) {
    countArray[arr[i]]++;
  }

  // Create an output array to store the sorted numbers
  const sortedArray = [];

  // Iterate over the count array and add each number to the output array based on its count
  for (let i = 0; i <= maxValue; i++) {
    while (countArray[i] > 0) {
      sortedArray.push(i);
      countArray[i]--;
    }
  }

  // Return the sorted array
  return sortedArray;
}
const arr = [1, 5, 2, 8, 3, 4, 9];
const maxValue = 9; // Assuming that the numbers in the array are between 0 and 9

const sortedArray = countingSort(arr, maxValue);

console.log(sortedArray); // Output: [1, 2, 3, 4, 5, 8, 9]
