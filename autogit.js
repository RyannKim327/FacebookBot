// Import the Axios library
import axios from 'axios';

// Make a GET request to a public API
axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => {
    // Handle the response from the API
    console.log(response);
  })
  .catch(error => {
    // Handle the error if the API call fails
    console.error(error);
  });

// Make a POST request to a public API
axios.post('https://jsonplaceholder.typicode.com/posts', {
  title: 'My New Post',
  body: 'This is the body of my new post',
  userId: 1
})
  .then(response => {
    // Handle the response from the API
    console.log(response);
  })
  .catch(error => {
    // Handle the error if the API call fails
    console.error(error);
  });

// Make a PUT request to a public API
axios.put('https://jsonplaceholder.typicode.com/posts/1', {
  title: 'Updated Title',
  body: 'Updated Body'
})
  .then(response => {
    // Handle the response from the API
    console.log(response);
  })
  .catch(error => {
    // Handle the error if the API call fails
    console.error(error);
  });

// Make a DELETE request to a public API
axios.delete('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    // Handle the response from the API
    console.log(response);
  })
  .catch(error => {
    // Handle the error if the API call fails
    console.error(error);
  });
