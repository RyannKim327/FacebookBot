function makeHttpRequest(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Usage
makeHttpRequest('https://api.example.com/data')
  .then(responseData => {
    console.log('Response:', responseData);
    // Do something with the response data
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle the error
  });
import android.os.AsyncTask;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MyAsyncTask extends AsyncTask<Void, Void, String> {

    private WebView webView;

    public MyAsyncTask(WebView webView) {
        this.webView = webView;
    }

    @Override
    protected String doInBackground(Void... voids) {
        // Run the JavaScript code in the WebView
        webView.evaluateJavascript("makeHttpRequest('https://api.example.com/data')", null);

        // Mock delay to wait for the response
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Obtain the response from the WebView
        return "Response data here";
    }

    @Override
    protected void onPostExecute(String response) {
        super.onPostExecute(response);

        // Handle the response here
        System.out.println("Response: " + response);
    }
}

// Usage in an activity
WebView webView = new WebView(context);
webView.getSettings().setJavaScriptEnabled(true);
webView.setWebViewClient(new WebViewClient());

MyAsyncTask asyncTask = new MyAsyncTask(webView);
asyncTask.execute();
