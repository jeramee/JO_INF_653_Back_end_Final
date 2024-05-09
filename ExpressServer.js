require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3011;
const mongoose = require('mongoose');
const fs = require('fs');
const State = require('./models/State'); // Assuming State.js defines the State model
const stateController = require("./controllers/stateController");
const connectDB = require("./config/dbConfig"); // Import the database connection function

// Use the state controller
app.use("/", stateController); // Change "/api" to "/"

// Connect to MongoDB
connectDB()
  .then(async () => {
    // Read data from JSON file
    const stateData = JSON.parse(fs.readFileSync('states.json', 'utf8'));
    
    // Modify data to remove _id field
    const modifiedStateData = stateData.map(state => {
      delete state._id; // Remove the _id field
      return state;
    });

    // Insert data into MongoDB
    await State.insertMany(modifiedStateData); // Remove { rawResult: true }
    
    console.log(`${stateData.length} states inserted successfully`);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
