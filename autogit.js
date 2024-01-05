// API endpoint
const apiUrl = 'https://api.example.com/data'; 

// Function to fetch data
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Call the fetchData function
fetchData();
