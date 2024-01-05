// Function to implement Fibonacci Search
function fibonacciSearch(arr, n, x) {
  // Find the smallest Fibonacci Number greater than or equal to n
  let fibMMm2 = 0; // (m-2)th Fibonacci Number
  let fibMMm1 = 1; // (m-1)th Fibonacci Number
  let fibM = fibMMm2 + fibMMm1; // mth Fibonacci Number
  while (fibM < n) {
    fibMMm2 = fibMMm1;
    fibMMm1 = fibM;
    fibM = fibMMm2 + fibMMm1;
  }

  // Marks the eliminated range from front
  let offset = -1;

  // While there are elements to be inspected
  while (fibM > 1) {
    // Check if fibMm-1 is a valid location for x
    let i = Math.min(offset + fibMMm1, n - 1);

    // If x is greater than the value at index fibMm-1, cut the subarray from offset to i
    if (arr[i] < x) {
      fibM = fibMMm1;
      fibMMm1 = fibMMm2;
      fibMMm2 = fibM - fibMMm1;
      offset = i;
    }
    // If x is less than the value at index fibMm-1, cut the subarray after i+1
    else if (arr[i] > x) {
      fibM = fibMMm2;
      fibMMm1 = fibMMm1 - fibMMm2;
      fibMMm2 = fibM - fibMMm1;
    }
    // element found
    else {
      return i;
    }
  }
  // comparing the last element with x
  if (fibMMm1 && arr[offset + 1] == x) {
    return offset + 1;
  }

  // element not found
  return -1;
}

// Driver code
let arr = [10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35];
let n = arr.length;
let x = 13;

let result = fibonacciSearch(arr, n, x);

if (result == -1) {
  console.log("Element not found");
} else {
  console.log("Element found at index", result);
}
