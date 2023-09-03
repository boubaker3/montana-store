require("dotenv").config();
const express = require("express");
 
const app = express();
const path = require("path");
 
const port = 5000;
 
const reviewsRouter = require("./routes/Reviews");
 
// Serve static files for React client
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port: ${port}`);
});
