// Import the necessary libraries.
const fetch = require('node-fetch');

// Define the API endpoint.
const endpoint = 'https://example.com/api/v1/endpoint';

// Define the async function to call the API.
const callAPI = async () => {
  // Fetch the data from the API.
  const response = await fetch(endpoint);

  // Parse the response as JSON.
  const data = await response.json();

  // Log the data to the console.
  console.log(data);
};

// Call the async function.
callAPI();
