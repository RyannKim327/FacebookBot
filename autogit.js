const removeVowels = (str) => {
  return str.replace(/[aeiou]/gi, '');
};

// Example usage
const str = 'Hello World!';
console.log(removeVowels(str)); // 'Hll Wrld!'
