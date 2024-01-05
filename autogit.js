// Function to calculate the area of a triangle
function calculateArea(base, height) {
  // Check if the base and height are valid numbers
  if (typeof base !== 'number' || typeof height !== 'number') {
    throw new Error('Base and height must be numbers');
  }

  // Calculate the area of the triangle
  const area = 0.5 * base * height;

  // Return the area
  return area;
}
// Calculate the area of a triangle with a base of 10 and a height of 5
const area = calculateArea(10, 5);

// Log the area to the console
console.log(`The area of the triangle is ${area}`);
The area of the triangle is 25
