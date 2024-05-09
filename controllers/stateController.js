const express = require("express");
const router = express.Router();
const State = require("../models/State");

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

// Get state data by state code
router.get("/states/:state", async (req, res) => {
  try {
    const state = await State.findOne({ stateCode: req.params.state });
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json(state);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a random fun fact for a specific state
router.get("/states/:state/funfact", async (req, res) => {
  try {
    const state = await State.findOne({ stateCode: req.params.state });
    if (!state || !state.funfacts || state.funfacts.length === 0) {
      return res.status(404).json({ message: "No fun facts found for the state" });
    }
    const randomIndex = Math.floor(Math.random() * state.funfacts.length);
    const randomFunFact = state.funfacts[randomIndex];
    res.status(200).json({ funfact: randomFunFact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get state capital by state code
router.get("/states/:state/capital", async (req, res) => {
  try {
    console.log(req.params.state); // Log the state code
    const state = await State.findOne({ stateCode: req.params.state });
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json({ state: state.name, capital: state.capital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Get state nickname by state code
router.get("/states/:state/nickname", async (req, res) => {
  try {
    const state = await State.findOne({ stateCode: req.params.state });
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json({ state: state.name, nickname: state.nickname });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get state population by state code
router.get("/states/:state/population", async (req, res) => {
  try {
    const state = await State.findOne({ stateCode: req.params.state });
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json({ state: state.name, population: state.population });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get state admission date by state code
router.get("/states/:state/admission", async (req, res) => {
  try {
    const state = await State.findOne({ stateCode: req.params.state });
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json({ state: state.name, admitted: state.admissionDate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
