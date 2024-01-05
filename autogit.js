// Fetch the contents of a URL and display it in the console.
fetch('https://example.com')
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error('Network response was not OK.');
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error in fetch: ', error);
  });

// Fetch a JSON file and parse it into an object.
fetch('data.json')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not OK.');
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error in fetch: ', error);
  });

// POST data to a server.
const data = {
  username: 'johndoe',
  password: 'secret'
};

fetch('https://example.com/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not OK.');
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error in fetch: ', error);
  });
