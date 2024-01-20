// Import required modules
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const vision = require("@google-cloud/vision");
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


const visionClient = new vision.ImageAnnotatorClient({
    keyFilename: "./silicon-cell-411821-cad25d072d74.json", // Change this later
});

visionClient.labelDetection('0_7jYE1-Za4AzaJdru.webp').then((result) =>{
    const labels = results[0].labelAnnotations;

    console.log("Labels:");
    labels.forEach((label) => console.log(label.description));
}).catch((err) => {
    console.error("Error", err);
});


  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      ai_test();
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
