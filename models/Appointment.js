// models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: String,
  gender: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  doctor: String,
  department: String,
  problems: String,
  message: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
