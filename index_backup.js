const express = require('express');
const State = require('./models/State'); // Import the State model

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET request for all state data
app.get('/states/', async (req, res) => {
  try {
    const { contig } = req.query;
    let states;
    if (contig === 'true') {
      states = await State.find({ code: { $nin: ['AK', 'HI'] } });
    } else if (contig === 'false') {
      states = await State.find({ code: { $in: ['AK', 'HI'] } });
    } else {
      states = await State.find({});
    }
    res.json(states);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET request for all data for a specific state
app.get('/states/:state', async (req, res) => {
  try {
    const stateCode = req.params.state.toUpperCase();
    const stateData = await State.findOne({ code: stateCode });
    if (!stateData) {
      return res.status(404).send('State not found');
    }
    res.json(stateData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ... other specific state data endpoints

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
