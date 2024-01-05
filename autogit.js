// Function to calculate the area of a triangle given its base and height
function triangleArea(base, height) {
  // Check if the inputs are valid
  if (base <= 0 || height <= 0) {
    throw new Error("The base and height must be positive numbers.");
  }

  // Calculate the area
  const area = 0.5 * base * height;

  // Return the area
  return area;
}

// Usage
const base = 10;
const height = 5;
const area = triangleArea(base, height);

console.log(`The area of the triangle is ${area} square units.`);
