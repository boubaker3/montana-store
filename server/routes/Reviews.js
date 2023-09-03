const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Review = require("../models/Review");

router.route("/reviews").get(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    const skip = (page - 1) * limit;

    const reviews = await Review.find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.route("/addReview").post(async (req, res) => {
  const { username, review, rating, userid } = req.body;

  // Define the review limit and timeframe (e.g., 1 review per day)
  const reviewLimit = 1;
  const reviewTimeframe = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // Calculate the start time of the review timeframe
  const startTime = new Date(Date.now() - reviewTimeframe);

  // Check the user's review activity within the timeframe
  Review.countDocuments({ userid, createdAt: { $gte: startTime } })
    .then((userReviewCount) => {
      if (userReviewCount >= reviewLimit) {
        return res.json({ res: "Review limit is one review per day" });
      }

      const newReview = new Review({ username, review, rating, userid });
      newReview
        .save()
        .then(() => {
          res.json({ res: "review added successfully" });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.send("token is undefined");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
module.exports = router;
