// Function to calculate the area of a triangle
function triangleArea(base, height) {
// Check if the base and height are valid numbers.
 if (isNaN(base) || isNaN(height)) {
   throw new Error("Inputs must be numeric values.");
 } else if (base <= 0 || height <= 0) {
   throw new Error("Base and height must be greater than 0.");
 }

 // Calculate the area using the formula: (1/2) * base * height
 const area = (1 / 2) * base * height;

 // Return the calculated area.
 return area;
}

// Example usage:

const area1 = triangleArea(5, 4); // Result: 10

// Print the result.
console.log("Area of the triangle:", area1);
