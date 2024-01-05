// Get the input element
const input = document.querySelector('input');

// Add an event listener for the input event
input.addEventListener('input', (event) => {

  // Get the text from the input element
  const text = event.target.value;

  // Check if the text is a valid number
  if (!isNaN(text)) {

    // Convert the text to a number
    const number = Number(text);

    // Perform some calculations on the number
    const square = number ** 2;
    const cube = number ** 3;

    // Display the results of the calculations
    document.querySelector('#square').textContent = square;
    document.querySelector('#cube').textContent = cube;
  } else {

    // Display an error message
    document.querySelector('#error').textContent = 'Invalid input';
  }
});
