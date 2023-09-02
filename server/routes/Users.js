require("dotenv").config();
const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    res.json({ error: "User not found" });
  }

  if (user.password !== password) {
    res.json({ error: "Invalid password" });
  }

  // Create and sign the JWT token
  const token = jwt.sign({ user }, process.env.ACCESS_TOKEN);

  res.json({ token, user });
});

router.route("/signup").post(async (req, res) => {
  const { username, email, password } = req.body;

  const userData = {
    username,
    email,
    password,
  };

  const user = new User(userData);
  registredUser = { email, password };
  user
    .save()
    .then(() => {
      const token = jwt.sign({ registredUser }, process.env.ACCESS_TOKEN);
      res.json({ token, user });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

module.exports = router;
