const str = 'hello';
const reversedStr = str.reverse();
console.log(reversedStr); // 'olleh'
const str = 'hello';
let reversedStr = '';

for (let i = str.length - 1; i >= 0; i--) {
  reversedStr += str[i];
}

console.log(reversedStr); // 'olleh'
const str = 'hello';
let reversedStr = '';
let i = str.length - 1;

while (i >= 0) {
  reversedStr += str[i];
  i--;
}

console.log(reversedStr); // 'olleh'
function reverseStr(str) {
  if (str === '') {
    return '';
  } else {
    return reverseStr(str.substring(1)) + str[0];
  }
}

const str = 'hello';
const reversedStr = reverseStr(str);
console.log(reversedStr); // 'olleh'
const str = 'hello';
const reversedStr = [...str].reverse().join('');
console.log(reversedStr); // 'olleh'
