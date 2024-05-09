require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3011;
const connectDB = require("./config/dbConfig"); // Import the database connection function
// const readAndInsertData = require('./readJsonFile'); // Import the function to read and insert JSON data

// Import the stateController router
const stateController = require("./controllers/stateController");

// Use the stateController router for all routes starting with "/states"
app.use("/states", stateController);

// Connect to MongoDB
connectDB()
  .then(() => {
    // Call the function to read and insert JSON data
    // readAndInsertData();
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
