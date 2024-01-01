function burrowsWheelerTransform(input) {
  // Generate all rotations of the input string
  const rotations = [];
  let str = input + '\0';
  for (let i = 0; i < str.length; i++) {
    rotations.push(str);
    str = str[str.length - 1] + str.substring(0, str.length - 1);
  }

  // Sort the rotations
  rotations.sort();

  // Extract the last characters of each rotation
  let transformed = '';
  for (let i = 0; i < rotations.length; i++) {
    transformed += rotations[i][rotations[i].length - 1];
  }

  return transformed;
}
const input = 'banana';
const transformed = burrowsWheelerTransform(input);
console.log(transformed); // Outputs: 'annb$aa'
