const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewShema = new Schema(
  {
    username: { type: String, required: true },
    userid: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewShema);

module.exports = Review;
