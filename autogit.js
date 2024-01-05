fetch('https://api.example.com/data')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    // Do something with the data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.log('Error:', error);
  });
