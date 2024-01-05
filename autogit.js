// Function to make an asynchronous HTTP request in Android
function makeAsyncRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    // Create a new instance of an AsyncTask
    const task = new android.os.AsyncTask({
      doInBackground() {
        // Perform the HTTP request on a background thread
        try {
          const connection = new java.net.URL(url).openConnection();
          connection.setRequestMethod(method);
          
          // Add any necessary headers
          connection.setRequestProperty("Content-Type", "application/json");
          
          // Check if request is a POST or PUT request and send the data
          if (method === "POST" || method === "PUT") {
            connection.setDoOutput(true);
            const outputStream = connection.getOutputStream();
            outputStream.write(data.getBytes("UTF-8"));
            outputStream.flush();
            outputStream.close();
          }
          
          // Get the response from the server
          const responseCode = connection.getResponseCode();
          const inputStream = responseCode < 400 ? connection.getInputStream() : connection.getErrorStream();
          const scanner = new java.util.Scanner(inputStream).useDelimiter("\\A");
          const responseBody = scanner.hasNext() ? scanner.next() : "";
          
          // Resolve the Promise with the response body
          resolve(responseBody);
        } catch (error) {
          reject(error);
        }
      
        return null;
      },
      
      onPostExecute(result) {
        // Called when the background task is complete
        // Can perform any necessary UI updates here
        
        console.log(result); // Log the result to the console
        
        return null;
      }
    });
    
    // Execute the AsyncTask
    task.execute();
  });
}

// Example usage
const url = "https://api.example.com/users";
const method = "GET";
const data = "{}";

makeAsyncRequest(url, method, data)
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
