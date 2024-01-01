// Import axios library
const axios = require('axios');

// Define the endpoint URL
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// Define an async function to make the API request
async function fetchData() {
  try {
    // Send a GET request to the API endpoint
    const response = await axios.get(apiUrl);
    
    // Log the response data to the console
    console.log(response.data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error:', error.message);
  }
}

// Call the fetchData function to make the API request
fetchData();
