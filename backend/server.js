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

      ai_test();
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);


// Error handling middleware
app.use(function(req, res, next)  {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

app.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    console.log(username + email, password);
     // Basic validation (you should add more robust validation in a real application)
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Invalid data. Please provide username, email, and password.' });
  }

  try {
    // Connect the client to the MongoDB server (optional starting in v4.7)
    await client.connect();

    // Insert user data into the "Users" collection in the "NWHacks" database
    const database = client.db('NWHacks');
    const usersCollection = database.collection('Users');

    const newUser = { username, email, password };
    const result = await usersCollection.insertOne(newUser);
    console.log(`User data inserted with ID: ${result.insertedId}`);
    // Respond with success message and user data
    return res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
})
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
