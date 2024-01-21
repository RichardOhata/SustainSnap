const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const uri = process.env.URI || " ";
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
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Invalid data. Please provide email and password.' });
      }

      try {
        // Connect to MongoDB
        await client.connect();

        // Find the user in the "Users" collection based on email and password
        const database = client.db('NWHacks');
        const usersCollection = database.collection('Users');

        const user = await usersCollection.findOne({ email, password });

        if (!user) {
            // If no user is found, return an authentication error
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        return res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
