// app.js (or server.js)
const express = require("express");
const app = express();
const stateController = require("./controllers/stateController"); // Adjust the path as needed

// Other middleware and configurations...

// Use the state controller
app.use("/api", stateController); // You can choose any base path (e.g., "/api/states")

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
