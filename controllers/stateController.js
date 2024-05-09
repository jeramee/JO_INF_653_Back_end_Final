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

// Add custom endpoints for state data
// Get state capital by state code
router.get('/states/:state/capital', async (req, res) => {
  const { state } = req.params;

  try {
    const stateData = await State.findOne({ stateCode: state });
    if (!stateData) {
      return res.status(404).send('State not found');
    }
    res.json({ state: stateData.name, capital: stateData.capital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get state nickname by state code
router.get('/states/:state/nickname', async (req, res) => {
  const { state } = req.params;

  try {
    const stateData = await State.findOne({ code: state });
    if (!stateData) {
      return res.status(404).send('State not found');
    }
    res.json({ state: stateData.name, nickname: stateData.nickname });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get state population by state code
router.get('/states/:state/population', async (req, res) => {
  const { state } = req.params;

  try {
    const stateData = await State.findOne({ code: state });
    if (!stateData) {
      return res.status(404).send('State not found');
    }
    res.json({ state: stateData.name, population: stateData.population });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get state admission date by state code
router.get('/states/:state/admission', async (req, res) => {
  const { state } = req.params;

  try {
    const stateData = await State.findOne({ code: state });
    if (!stateData) {
      return res.status(404).send('State not found');
    }
    res.json({ state: stateData.name, admitted: stateData.admissionDate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router; // Export the router instead of starting the server
