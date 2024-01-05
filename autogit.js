let fib0 = 0;
let fib1 = 1;
let fib2 = fib0 + fib1;

while (fib2 < arr.length) {
  fib0 = fib1;
  fib1 = fib2;
  fib2 = fib0 + fib1;
}
function fibonacciSearch(arr, key) {
  let fib0 = 0;
  let fib1 = 1;
  let fib2 = fib0 + fib1;

  while (fib2 < arr.length) {
    fib0 = fib1;
    fib1 = fib2;
    fib2 = fib0 + fib1;
  }

  let offset = -1;
  let mid = -1;

  while (fib2 > 1) {
    const index = Math.min(offset + fib0, arr.length - 1);

    if (arr[index] === key) {
      mid = index;
      break;
    } else if (arr[index] < key) {
      fib0 = fib1;
      fib1 = fib2;
      fib2 = fib0 + fib1;
      offset = index;
    } else {
      fib2 = fib1;
      fib1 = fib0;
      fib0 = fib2 - fib1;
    }
  }

  return mid;
}
