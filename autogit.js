function validateEmail(email) {
  // Regular expression pattern to validate the email
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Check if the email matches the pattern
  return pattern.test(email);
}

// Usage:
var email = "test@example.com";
console.log(validateEmail(email)); // Returns true
