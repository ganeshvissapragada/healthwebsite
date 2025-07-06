// routes/appointment.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

router.post("/appointments", async (req, res) => {
  try {
    const newApp = new Appointment(req.body);
    await newApp.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to book appointment" });
  }
});

module.exports = router;
