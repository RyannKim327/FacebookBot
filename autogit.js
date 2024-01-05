// Function to calculate the area of a triangle using the formula:
// Area = 0.5 * base * height
function calculateTriangleArea(base, height) {
  // Check if the inputs are valid numbers
  if (typeof base !== 'number' || typeof height !== 'number') {
    throw new Error('Inputs must be numbers');
  }

  // Calculate the area of the triangle
  const area = 0.5 * base * height;

  // Return the calculated area
  return area;
}

// Sample usage
const base = 10;
const height = 5;
const area = calculateTriangleArea(base, height);

console.log(`The area of the triangle is ${area} square units.`);
