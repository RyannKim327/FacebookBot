// Function to calculate the area of a triangle
function triangleArea(base, height) {
  // Check if the base and height are valid numbers
  if (typeof base !== "number" || typeof height !== "number") {
    throw new Error("Base and height must be numbers");
  }
  
  // Calculate the area of the triangle
  const area = 0.5 * base * height;
  
  // Return the area
  return area;
}

// Example usage
const base = 10;
const height = 5;
const area = triangleArea(base, height);

console.log(`The area of the triangle is ${area} square units.`);
