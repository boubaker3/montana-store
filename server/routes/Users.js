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
  const token = jwt.sign(
    { user },
    "9d465f6591e9feb7640b6235c0782ae23603574ab48620bd626ccc016f0b5e4d488adb7c52fb4a2ac13a4384e89562350d3c91d4d17e79e8bc6298f9a88313b8"
  );

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
      const token = jwt.sign(
        { registredUser },
        "9d465f6591e9feb7640b6235c0782ae23603574ab48620bd626ccc016f0b5e4d488adb7c52fb4a2ac13a4384e89562350d3c91d4d17e79e8bc6298f9a88313b8"
      );
      res.json({ token, user });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

module.exports = router;
