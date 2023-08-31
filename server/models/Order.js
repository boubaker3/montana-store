const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    paymentID: { type: String, required: true },
    payerID: { type: String, required: true },
    paymentSource: { type: String, required: true },
    productName: { type: String, required: true },
    productImage: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    vid: { type: String, required: true },
    orderId: { type: String, required: true },
    userid: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
