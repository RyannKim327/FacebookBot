// Create a function that takes a string as input
function sayHello(name) {
  // Check if the input is a string
  if (typeof name !== 'string') {
    throw new Error('Input must be a string');
  }

  // Return a string that greets the person by name
  return `Hello, ${name}!`;
}

// Get the user input from the command line
const input = process.argv[2];

// Try to say hello to the user
try {
  const greeting = sayHello(input);
  console.log(greeting);
}
// Catch any errors that may occur
catch (error) {
  console.error(error.message);
}
