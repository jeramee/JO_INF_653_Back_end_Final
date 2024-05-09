// stateController.js

const express = require('express');
const router = express.Router(); // Use Router instead of creating a new app instance
const State = require("../models/State");

router.get('/', async (req, res) => {
  const { contig } = req.query;

  try {
    console.log('Received request to /states/');
    console.log('contig:', contig);

    let states;
    if (contig === 'false') {
      // Include only Alaska (AK) and Hawaii (HI)
      states = await State.find({ stateCode: { $in: ['AK', 'HI'] } });
    } else {
      // Include all other states (excluding AK and HI)
      states = await State.find({ stateCode: { $nin: ['AK', 'HI'] } });
    }

    console.log('Retrieved states:', states);
    res.json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all states or states based on contig parameter
router.get("/states", async (req, res) => {
  try {
    const contig = req.query.contig;

    let states;
    if (contig === 'true') {
      states = await State.find({ contig: true });
    } else if (contig === 'false') {
      states = await State.find({ contig: false });
    } else {
      states = await State.find();
    }

    res.status(200).json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// GET state by state code
router.get('/states/:state', async (req, res) => {
  const { state } = req.params;

  try {
    const stateData = await State.findOne({ stateCode: state });
    if (!stateData) {
      return res.status(404).send('State not found');
    }
    res.json(stateData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
    const stateData = await State.findOne({ stateCode: state });
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
    const stateData = await State.findOne({ stateCode: state });
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
    const stateData = await State.findOne({ stateCode: state });
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
