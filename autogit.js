function isPrime(number) {
  if (number <= 1) {
    return false;
  }
  
  // Check for divisibility from 2 to square root of the number
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  
  return true;
}
let number = 17;
console.log(isPrime(number));  // Output: true

number = 10;
console.log(isPrime(number));  // Output: false
