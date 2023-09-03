const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
require("dotenv").config();

router.route("/orders").get(authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const userid = req.query.userid;

    const skip = (page - 1) * limit;

    const orders = await Order.find({ userid })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.route("/addOrder").post(authenticateToken, (req, res) => {
  const paymentID = req.body.paymentID;
  const payerID = req.body.payerID;
  const paymentSource = req.body.paymentSource;
  const productName = req.body.productName;
  const productImage = req.body.productImage;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const vid = req.body.vid;
  const orderId = req.body.orderId;
  const userid = req.body.userid;

  const newOrder = new Order({
    paymentID,
    payerID,
    paymentSource,
    productName,
    productImage,
    price,
    quantity,
    vid,
    orderId,
    userid,
  });

  newOrder
    .save()
    .then(() =>
      res.json("your order for " + productName + " was sent successfully")
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    next();
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
module.exports = router;
