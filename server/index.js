const express = require("express");

const app = express();
const path = require("path");

const port = 5000;

app.use(express.json());

// Serve static files for React client
app.use(express.static("./client/build"));

// This route handles all other routes and serves 'index.html'.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
