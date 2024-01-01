const axios = require('axios');
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

axios.get(apiUrl)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.log('Error:', error);
  });
