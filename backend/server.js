// Import required modules
const express = require('express');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Sample API route
app.post('/api/data', (req, res) => {
  const { data } = req.body;
  // Process the data and send a response
  res.json({ message: `Received data: ${data}` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
