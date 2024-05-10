// stateController.js

const express = require('express');
const router = express.Router(); // Use Router instead of creating a new app instance
const State = require("../models/State");
const path = require('path');

// Handle requests to the root path '/'
router.get('/', async (req, res) => {
  // This route will handle requests to the root path
  res.sendFile(path.join(__dirname, '../index.html'));});

// Handle requests to '/states/'
router.get('/states', async (req, res) => {
  const { contig } = req.query;

  try {
    console.log('Received request to /states/');
    console.log('contig:', contig);

    console.log('contig:', contig);

    let states;
    if (contig === 'false') {
      // Include only Alaska (AK) and Hawaii (HI)

      console.log('MongoDB Query:', { stateCode: { $in: ['AK', 'HI'] } }); // or { stateCode: { $nin: ['AK', 'HI'] } }

      states = await State.find({ code: { $in: ['AK', 'HI'] } });
    } else {
      // Include all other states (excluding AK and HI)
      states = await State.find({ code: { $nin: ['AK', 'HI'] } });
    }

    console.log('Retrieved states:', states);
    res.json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/states/:state', async (req, res) => {
  const { state } = req.params;

  try {
    const stateData = await State.findOne({ code: { $regex: new RegExp(`^${state}$`, 'i') } });
    if (!stateData) {
      return res.status(404).send('State not found');
    }
    res.json(stateData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/states/:state/funfact', async (req, res) => {
  const { state } = req.params;

  try {
    // Aggregate pipeline to retrieve a random fun fact for the specified state
    const randomFunFact = await State.aggregate([
      { $match: { code: { $regex: new RegExp(`^${state}$`, 'i') } } }, // Match the state code (case-insensitive)
      { $project: { funfacts: 1 } }, // Project only the 'funfacts' field
      { $unwind: '$funfacts' }, // Unwind the array of fun facts
      { $sample: { size: 1 } }, // Randomly sample one fun fact
    ]);

    // Check if a random fun fact is found
    if (!randomFunFact || randomFunFact.length === 0) {
      return res.status(404).send('Fun fact not found for the state');
    }

    // Return the random fun fact in the response
    res.json({ state, funfact: randomFunFact[0].funfacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/states/:state/capital', async (req, res) => {
  // Assign the value of req.params.state to a temporary variable
  const stateCode = req.params.state;

  try {
    console.log('Received request to /states/:state/capital');
    console.log('State code:', stateCode);

    // Find the state data based on the state code
    const stateData = await State.findOne({ code: { $regex: new RegExp(`^${stateCode}$`, 'i') } });
    console.log('State Data:', stateData);

    if (!stateData) {
      // If no state data is found, return a 404 response
      console.log('State not found');
      return res.status(404).json({ error: 'State not found' });
    }

    // Return the state name and capital in the response
    console.log('Capital:', stateData.capital_city);
    console.log('State:', stateData.state);

    // Extract the required data using the original field name
    const extractedData = { state: stateData.state, capital: stateData.capital_city };
    console.log('Extracted Data:', extractedData);

    res.json(extractedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get state nickname by state code
router.get('/states/:state/nickname', async (req, res) => {
  // Assign the value of req.params.state to a temporary variable
  const stateCode = req.params.state;

  try {
    const stateData = await State.findOne({ code: { $regex: new RegExp(`^${stateCode}$`, 'i') } });
    if (!stateData) {
      return res.status(404).send('State not found');
    }
    res.json({ state: stateData.state, nickname: stateData.nickname });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get state population by state code
router.get('/states/:state/population', async (req, res) => {
  const stateCode = req.params.state;

  try {
    const stateData = await State.findOne({ code: { $regex: new RegExp(`^${stateCode}$`, 'i') } });
    if (!stateData) {
      return res.status(404).send('State not found');
    }
    res.json({ state: stateData.state, population: stateData.population });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get state admission date by state code
router.get('/states/:state/admission', async (req, res) => {
  const stateCode = req.params.state;

  try {
    const stateData = await State.findOne({ code: { $regex: new RegExp(`^${stateCode}$`, 'i') } });
    if (!stateData) {
      return res.status(404).send('State not found');
    }
    res.json({ state: stateData.state, admitted: stateData.admission_date });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Handle POST requests to add fun facts
router.post('/states/:state/funfact', async (req, res) => {
  const { state } = req.params;
  const { funfacts } = req.body;

  try {
    // Find the state document
    let stateData = await State.findOne({ code: { $regex: new RegExp(`^${state}$`, 'i') } });
    if (!stateData) {
      return res.status(404).send('State not found');
    }

    // Append new fun facts to existing ones
    stateData.funfacts = stateData.funfacts ? [...stateData.funfacts, ...funfacts] : funfacts;

    // Save the updated state document
    await stateData.save();

    res.json(stateData.funfacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Handle PATCH requests to update fun facts
router.patch('/states/:state/funfact', async (req, res) => {
  const { state } = req.params;
  const { funfacts } = req.body;

  try {
    // Find the state document
    let stateData = await State.findOne({ code: { $regex: new RegExp(`^${state}$`, 'i') } });
    if (!stateData) {
      return res.status(404).send('State not found');
    }

    // Replace existing fun facts with new ones
    stateData.funfacts = funfacts;

    // Save the updated state document
    await stateData.save();

    res.json(stateData.funfacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/states/:state/funfact', async (req, res) => {
  const { state } = req.params;
  const { index } = req.body;

  try {
    // Find the state data based on the state code
    const stateData = await State.findOne({ code: { $regex: new RegExp(`^${state}$`, 'i') } });
    
    if (!stateData) {
      return res.status(404).send('State not found');
    }

    // Check if index is provided in the request body
    if (!index && index !== 0) {
      return res.status(400).send('Index not provided or invalid');
    }

    // Adjust index to zero-based
    const adjustedIndex = parseInt(index) - 1;

    // Remove the fun fact at the specified index
    if (adjustedIndex < 0 || adjustedIndex >= stateData.funfacts.length) {
      return res.status(400).send('Invalid index');
    }

    stateData.funfacts.splice(adjustedIndex, 1);

    // Save the updated state data
    await stateData.save();

    res.json({ message: 'Fun fact removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router; // Export the router instead of starting the server
