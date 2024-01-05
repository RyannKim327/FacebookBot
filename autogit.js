function interpolationSearch(arr, target) {
  // Check if array is empty.
  if (arr.length === 0) {
    return -1;
  }

  // Find the index of the element using interpolation search.
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    // Calculate the position of the target element.
    let pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (target - arr[low]));

    // Check if the target element is at the calculated position.
    if (arr[pos] === target) {
      return pos;
    }

    // Adjust the search interval based on the comparison.
    if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  // Return -1 if the target element was not found.
  return -1;
}
// Input array.
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

// Target element to search for.
const target = 11;

// Perform interpolation search.
const index = interpolationSearch(arr, target);

// Print the result.
if (index >= 0) {
  console.log(`Element ${target} found at index ${index}.`);
} else {
  console.log("Element not found.");
}
Element 11 found at index 5.
