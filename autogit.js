// Import the necessary modules.
const fetch = require('node-fetch');
const fs = require('fs');

// Define the URL of the API endpoint.
const endpoint = 'https://example.com/api/v1/endpoint';

// Make a GET request to the API endpoint.
fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    // Save the data to a file.
    fs.writeFileSync('data.json', JSON.stringify(data));
  })
  .catch(error => {
    console.error(error);
  });
