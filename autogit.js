// Importing the Axios library
const axios = require('axios');

// Example API endpoint URL
const apiUrl = 'https://api.example.com/data';

// Making a GET request
axios.get(apiUrl)
  .then(response => {
    // Handling the response data
    console.log(response.data);
  })
  .catch(error => {
    // Handling any errors
    console.error(error);
  });

// Making a POST request
const postData = { name: 'John Doe', age: 30 };
axios.post(apiUrl, postData)
  .then(response => {
    // Handling the response data
    console.log(response.data);
  })
  .catch(error => {
    // Handling any errors
    console.error(error);
  });

// Making a PUT request
const putData = { id: 123, name: 'Jane Smith', age: 25 };
axios.put(apiUrl, putData)
  .then(response => {
    // Handling the response data
    console.log(response.data);
  })
  .catch(error => {
    // Handling any errors
    console.error(error);
  });

// Making a DELETE request
axios.delete(apiUrl)
  .then(response => {
    // Handling the response data
    console.log(response.data);
  })
  .catch(error => {
    // Handling any errors
    console.error(error);
  });
