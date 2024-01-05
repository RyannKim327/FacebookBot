function burrowsWheelerTransform(input) {
  const cyclicShifts = [];
  
  // Generate all cyclic shifts
  for (let i = 0; i < input.length; i++) {
    cyclicShifts.push(input.substr(i) + input.substr(0, i));
  }
  
  // Sort cyclic shifts in lexicographic order
  cyclicShifts.sort();
  
  // Find the last column of sorted cyclic shifts
  const transformedString = cyclicShifts.map(shift => shift.charAt(input.length - 1)).join("");
  
  return transformedString;
}

// Example usage
const inputString = "banana";
const transformed = burrowsWheelerTransform(inputString);
console.log(transformed);
annb$aa
