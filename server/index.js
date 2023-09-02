require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const cors = require("cors");
const https = require("https"); // Import the 'https' module
const fs = require("fs"); // Import the 'fs' module
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

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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

// Define the SSL certificate and private key paths
const privateKeyPath = "/etc/letsencrypt/live/montanastore.net/privkey.pem";
const certificatePath = "/etc/letsencrypt/live/montanastore.net/fullchain.pem";

// Read the SSL certificate and private key files
const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const certificate = fs.readFileSync(certificatePath, "utf8");

// Create the HTTPS options object
const credentials = { key: privateKey, cert: certificate };

// Create the HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(process.env.PORT || port, () => {
  console.log(`HTTPS Server is running on port: ${port}`);
});
