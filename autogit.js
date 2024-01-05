const arr = [4, 2, 9, 5, 1];

const max = Math.max(...arr);

console.log(max); // Output: 9
const arr = [4, 2, 9, 5, 1];

let max = arr[0];

for (let i = 1; i < arr.length; i++) {
  if (arr[i] > max) {
    max = arr[i];
  }
}

console.log(max); // Output: 9
