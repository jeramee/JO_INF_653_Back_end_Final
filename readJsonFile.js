const fs = require('fs');
const State = require('./models/State'); // Assuming State.js defines the State model
const connectDB = require("./config/dbConfig"); // Import the database connection function

// Function to read JSON file and insert data into MongoDB
async function readAndInsertData() {
  try {
    // Read data from JSON file
    const stateData = JSON.parse(fs.readFileSync('states.json', 'utf8'));
    
    // Modify data to remove _id field
    const modifiedStateData = stateData.map(state => {
      delete state._id; // Remove the _id field
      return state;
    });

    // Connect to MongoDB
    await connectDB();

    // Insert data into MongoDB
    await State.insertMany(modifiedStateData);

    console.log(`${stateData.length} states inserted successfully`);
  } catch (err) {
    console.error('Error reading JSON file and inserting data into MongoDB:', err);
  }
}

// Execute the function to read and insert data
readAndInsertData();
