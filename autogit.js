// Get the input element
const inputElement = document.querySelector('input');

// Add an event listener for the input event
inputElement.addEventListener('input', (event) => {
  // Get the value of the input element
  const inputValue = event.target.value;

  // Do something with the input value
  console.log(inputValue);
});
