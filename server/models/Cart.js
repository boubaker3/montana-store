const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    productName: { type: String, required: true },
    productImage: { type: String, required: true },
    sellPrice: { type: String, required: true },
    pid: { type: String, required: true, unique: true },
    userid: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
