function findCommonElements(array1, array2) {
  const commonElements = [];

  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        commonElements.push(array1[i]);
        break; // Found a common element, move to the next element in array1
      }
    }
  }

  return commonElements;
}
function findCommonElements(array1, array2) {
  return array1.filter(element => array2.includes(element));
}
function findCommonElements(array1, array2) {
  const set1 = new Set(array1);
  const commonElements = [];

  array2.forEach(element => {
    if (set1.has(element)) {
      commonElements.push(element);
    }
  });

  return commonElements;
}
const _ = require('lodash');

function findCommonElements(array1, array2) {
  return _.intersection(array1, array2);
}
