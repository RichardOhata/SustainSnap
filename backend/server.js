// Import required modules
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://richardohata:sWjzFb4Z8Rc7BoYO@cluster0.crtjcno.mongodb.net/?retryWrites=true&w=majority";
// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

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
