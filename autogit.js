const arr = [10, 5, 8, 20, 15];
arr.sort((a, b) => b - a);
const secondLargest = arr[1];
console.log(secondLargest);
const arr = [10, 5, 8, 20, 15];
let largest = Number.MIN_VALUE;
let secondLargest = Number.MIN_VALUE;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > largest) {
    secondLargest = largest;
    largest = arr[i];
  } else if (arr[i] > secondLargest && arr[i] !== largest) {
    secondLargest = arr[i];
  }
}

console.log(secondLargest);
const arr = [10, 5, 8, 20, 15];
const secondLargest = arr.reduce((largest, current) => {
  if (current > largest[0]) {
    largest[1] = largest[0];
    largest[0] = current;
  } else if (current > largest[1] && current !== largest[0]) {
    largest[1] = current;
  }
  return largest;
}, [Number.MIN_VALUE, Number.MIN_VALUE])[1];

console.log(secondLargest);
