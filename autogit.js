// Function to calculate the area of a triangle
function calculateTriangleArea(base, height) {
  var area = (base * height) / 2;
  return area;
}

// Example usage
var base = 10;
var height = 5;
var triangleArea = calculateTriangleArea(base, height);
console.log("The area of the triangle is: " + triangleArea);
