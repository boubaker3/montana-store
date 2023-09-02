const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const path = require("path");
const cors = require("cors");
const port = 5000;

// Enable CORS before handling API routes
app.use(cors());

app.use(express.json());

// API routes setup
const authRouter = require("./routes/Users");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Orders");
const reviewsRouter = require("./routes/Reviews");
const contactsRouter = require("./routes/Contacts");

app.use("/", authRouter);
app.use("/", cartRouter);
app.use("/", ordersRouter);
app.use("/", reviewsRouter);
app.use("/", contactsRouter);

mongoose.connect(
  "mongodb+srv://boubaker03:ach.2003@montana-cluster.uzz299k.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
// Serve static files for React client
app.use(express.static("./client/build"));

// This route handles all other routes and serves 'index.html'.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.use((err, req, res, next) => {
  console.log(err.message);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
