class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Create a JavaScriptInterface object
        val jsInterface = JavaScriptInterface(this)

        // Get the WebView
        val webView = findViewById<WebView>(R.id.webView)

        // Enable JavaScript
        webView.settings.javaScriptEnabled = true

        // Add the JavaScriptInterface to the WebView
        webView.addJavascriptInterface(jsInterface, "Android")

        // Load the HTML content
        webView.loadDataWithBaseURL(null, HTML_CONTENT, "text/html", "UTF-8", null)
    }

    // The JavaScriptInterface class
    class JavaScriptInterface(private val activity: MainActivity) {

        // A method that can be called from JavaScript
        @JavascriptInterface
        fun callAsyncFunction() {
            // Create an AsyncTask to perform the asynchronous task
            val task = object : AsyncTask<Void, Void, String>() {

                override fun doInBackground(vararg voids: Void): String? {
                    // Perform the asynchronous task here
                    return "Hello from AsyncTask!"
                }

                override fun onPostExecute(result: String?) {
                    super.onPostExecute(result)

                    // Call a JavaScript function to pass the result back to JavaScript
                    activity.runOnUiThread {
                        activity.webView.evaluateJavascript("receiveResult('$result')", null)
                    }
                }
            }

            // Execute the AsyncTask
            task.execute()
        }
    }

    // The HTML content
    private val HTML_CONTENT =
        """
        <html>
        <head>
            <title>JavaScript & Android Interaction</title>
        </head>
        <body>
            <h1>JavaScript & Android Interaction</h1>
            <button onclick="callAsyncFunction()">Call Async Function</button>
            <div id="result"></div>
        </body>
        </html>
        """
}
