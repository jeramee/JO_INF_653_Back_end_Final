const express = require('express');
const app = express();
const PORT = 3000;

// Mock data for demonstration purposes
const statesData = {
  'NY': { name: 'New York', capital: 'Albany', nickname: 'Empire State', population: '19.45M', admitted: '1788-07-26', funfacts: ['The Big Apple', 'Statue of Liberty'] },
  // ... other states
};

app.get('/states/', (req, res) => {
  const { contig } = req.query;

  // Assuming statesData is an object containing state data
  const filteredData = {};

  for (const code in statesData) {
    if (code === 'AK' || code === 'HI') {
      filteredData[code] = statesData[code];
    } else if (contig === 'true') {
      filteredData[code] = statesData[code];
    }
  }

  res.json(filteredData);
});

app.get('/states/:state', (req, res) => {
  const { state } = req.params;
  const stateData = statesData[state.toUpperCase()];

  if (!stateData) {
    return res.status(404).send('State not found');
  }

  res.json(stateData);
});

app.get('/states/:state/funfact', (req, res) => {
  const { state } = req.params;
  const stateData = statesData[state.toUpperCase()];

  if (!stateData || !stateData.funfacts) {
    return res.status(404).send('Fun fact not found');
  }

  const randomIndex = Math.floor(Math.random() * stateData.funfacts.length);
  res.send(stateData.funfacts[randomIndex]);
});

// ... other specific state data endpoints

function filterContiguousStates(data) {
  // Logic to filter out non-contiguous states (AK, HI)
}

function filterNonContiguousStates(data) {
  // Logic to filter and return only non-contiguous states (AK, HI)
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
