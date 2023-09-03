const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart");

router.route("/getCart").get(authenticateToken, (req, res) => {
  const { userid, page, limit = 10 } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if (page == null) {
    Cart.find({ userid: userid })
      .then((cart) => {
        res.json(cart);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  } else {
    Cart.find({ userid: userid })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 })
      .then((cart) => {
        res.json(cart);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  }
});

router.route("/getCartlength").get(authenticateToken, (req, res) => {
  const { userid } = req.query;

  Cart.find({ userid: userid })
    .then((cart) => {
      res.json(cart);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

router.route("/addToCart").post(authenticateToken, async (req, res) => {
  const { productName, productImage, sellPrice, pid, userid } = req.body;

  // Check if the user already has 50 items in their cart
  Cart.countDocuments({ userid })
    .then((userCartCount) => {
      if (userCartCount >= 50) {
        return res.json({ res: "Cart limit exceeded (maximum 50 items)" });
      }

      const cart = new Cart({
        productName,
        productImage,
        sellPrice,
        pid,
        userid,
      });
      cart
        .save()
        .then(() => {
          res.json({ res: "added to cart successfully" });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

router.route("/deleteCart").delete(authenticateToken, (req, res) => {
  const { id } = req.query;

  Cart.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "Cart item deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
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
