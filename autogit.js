function findStringLength(str) {
  let count = 0;
  while (str[count] !== undefined) {
    count++;
  }
  return count;
}

// Example usage:
const str = "Hello World";
const length = findStringLength(str);
console.log(length); // Output: 11
