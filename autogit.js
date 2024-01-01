// Function to perform Burrows-Wheeler Transform (BWT)
function burrowsWheelerTransform(input) {
  // Append end of text marker
  let text = input + "$";

  // Generate all rotations of the input string
  let rotations = [];
  for (let i = 0; i < text.length; i++) {
    rotations.push(text.slice(i) + text.slice(0, i));
  }

  // Sort the rotations lexicographically
  rotations.sort();

  // Get the last characters of each rotation
  let transformed = "";
  for (let i = 0; i < rotations.length; i++) {
    transformed += rotations[i].charAt(rotations[i].length - 1);
  }

  return transformed;
}

// Example usage
let input = "banana";
let transformed = burrowsWheelerTransform(input);
console.log(transformed);  // Outputs: anbn$aa
