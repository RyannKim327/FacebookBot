async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function connectAsyncTask() {
  const url = 'https://api.example.com/data'; // Replace with your API endpoint
  
  const data = await fetchData(url);
  
  // Do something with the fetched data
  if (data) {
    console.log('Fetched data:', data);
    // Process the data
  } else {
    console.log('Failed to fetch data');
    // Handle the error
  }
}

// Trigger the async task
connectAsyncTask();
