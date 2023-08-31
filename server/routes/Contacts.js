const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

router.route("/addContact").post(async (req, res) => {
  const { fullname, email, phone, message } = req.body;

  // Define the contact limit and timeframe (e.g., 1 contact per day)
  const contactLimit = 1;
  const contactTimeframe = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // Calculate the start time of the contact timeframe
  const startTime = new Date(Date.now() - contactTimeframe);

  // Check the user's contact activity within the timeframe
  Contact.countDocuments({ email, phone, createdAt: { $gte: startTime } })
    .then((userContactCount) => {
      if (userContactCount >= contactLimit) {
        return res.json({ res: "Contact limit 1 message per day" });
      }

      const newContact = new Contact({ fullname, email, phone, message });
      newContact
        .save()
        .then(() => {
          res.json({ res: "your message was sent successfully" });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

module.exports = router;
