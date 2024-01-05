const array = [1, 2, 3, 4, 2, 3, 5];

const uniqueArray = Array.from(new Set(array));

console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
const array = [1, 2, 3, 4, 2, 3, 5];

const uniqueArray = array.filter((value, index, self) => {
  return self.indexOf(value) === index;
});

console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
