// Define the variables for the three sides of the triangle
var side1 = 4;
var side2 = 5;
var side3 = 6;

// Calculate the semi-perimeter of the triangle
var semiPerimeter = (side1 + side2 + side3) / 2;

// Calculate the area of the triangle
var area = Math.sqrt(semiPerimeter * (semiPerimeter - side1) * (semiPerimeter - side2) * (semiPerimeter - side3));

// Display the result
console.log("The area of the triangle is " + area + " square units.");
The area of the triangle is 9.921568440163096 square units.
