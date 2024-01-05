// Import the API library
const fetch = require('node-fetch');

// Define the API endpoint
const endpoint = 'https://example.com/api/v1/data';

// Define the API key
const apiKey = 'YOUR_API_KEY';

// Create an async function to fetch the data
async function getData() {
  // Create a request object
  const request = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
  };

  // Fetch the data
  const response = await fetch(endpoint, request);

  // Parse the response as JSON
  const data = await response.json();

  // Log the data
  console.log(data);
}

// Call the async function
getData();
