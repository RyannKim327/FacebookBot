// Import axios library
import axios from 'axios';

// Define an endpoint URL
const endpoint = 'https://random-data-api.com/api/v2/users?size=10';

// Make a GET request using axios to fetch random user data
axios.get(endpoint)
  .then((response) => {
    // Handle the response
    console.log(response.data);
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });

// You can also define custom headers for the request
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <token>'
};

// Make a POST request with custom headers
axios.post(endpoint, data, { headers })
  .then((response) => {
    // Handle the response
    console.log(response.data);
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });

// You can also use axios to make PUT, DELETE or PATCH requests
axios.put(endpoint, data)
  .then((response) => {
    // Handle the response
    console.log(response.data);
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });

axios.delete(endpoint)
  .then((response) => {
    // Handle the response
    console.log(response.data);
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });

axios.patch(endpoint, data)
  .then((response) => {
    // Handle the response
    console.log(response.data);
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });
