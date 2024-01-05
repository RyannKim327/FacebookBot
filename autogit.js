const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // Output: [5, 4, 3, 2, 1]
const arr = [1, 2, 3, 4, 5];
let reversedArr = [];
for (let i = arr.length - 1; i >= 0; i--) {
  reversedArr.push(arr[i]);
}
console.log(reversedArr); // Output: [5, 4, 3, 2, 1]
const arr = [1, 2, 3, 4, 5];
const reversedArr = [...arr].reverse();
console.log(reversedArr); // Output: [5, 4, 3, 2, 1]
const arr = [1, 2, 3, 4, 5];
const reversedArr = arr.reduceRight((acc, curr) => {
  acc.push(curr);
  return acc;
}, []);
console.log(reversedArr); // Output: [5, 4, 3, 2, 1]
