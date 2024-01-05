const arr = [1, 2, 3, 4, 5, 1, 2, 3];

const uniqueArr = Array.from(new Set(arr));

console.log(uniqueArr); // Output: [1, 2, 3, 4, 5]
const arr = [1, 2, 3, 4, 5, 1, 2, 3];

const uniqueArr = arr.filter((item, index) => {
  return arr.indexOf(item) === index;
});

console.log(uniqueArr); // Output: [1, 2, 3, 4, 5]
const arr = [1, 2, 3, 4, 5, 1, 2, 3];

const uniqueArr = arr.reduce((accumulator, currentValue) => {
  if (!accumulator[currentValue]) {
    accumulator[currentValue] = true;
    return [...accumulator, currentValue];
  } else {
    return accumulator;
  }
}, []);

console.log(uniqueArr); // Output: [1, 2, 3, 4, 5]
const arr = [1, 2, 3, 4, 5, 1, 2, 3];

const uniqueArr = [];

arr.forEach((item) => {
  if (arr.indexOf(item) === arr.lastIndexOf(item)) {
    uniqueArr.push(item);
  }
});

console.log(uniqueArr); // Output: [1, 2, 3, 4, 5]
const arr = [1, 2, 3, 4, 5, 1, 2, 3];

const uniqueArr = Object.values(arr.reduce((accumulator, currentValue) => {
  accumulator[currentValue] = true;
  return accumulator;
}, {}));

console.log(uniqueArr); // Output: [1, 2, 3, 4, 5]
