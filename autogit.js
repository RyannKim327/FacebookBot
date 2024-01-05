// Import the necessary libraries.
const fetch = require('node-fetch');

// Define the API endpoint.
const endpoint = 'https://api.example.com/v1/endpoint';

// Make a GET request to the API endpoint.
fetch(endpoint)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error: ' + response.status);
    }
    return response.json();
  })
  .then((data) => {
    console.log('API response:', data);
  })
  .catch((error) => {
    console.error('Error fetching API data:', error);
  });
