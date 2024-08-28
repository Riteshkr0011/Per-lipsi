const express = require('express');
const summariseText = require('./summarize.js');
const cors = require('cors');
const app = express();
const port = 3000;

// Parses JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cors());

// Serves static files from the 'public' directory
app.use(express.static('public'));

// Server End Points
app.post("/summarize", async (req, res) => {
  const text = req.body.text_to_summarize;
  try {
    const summary = await summariseText(text); // Wait for the summarized text
    res.status(200).send(summary); // Send the summary text as a response with a 200 OK status
  } catch (error) {
    console.error('Error summarizing text:', error.message || error);
    res.status(500).send({
      error: 'Failed to summarize text. Please try again later.',
      details: error.message || error.toString() // Optionally include error details in the response
    });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
