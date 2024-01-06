const arr = [5, 2, 9, 1, 7];

const max = Math.max(...arr);

console.log(max); // Output: 9
const arr = [5, 2, 9, 1, 7];

const max = Math.max.apply(null, arr);

console.log(max); // Output: 9
