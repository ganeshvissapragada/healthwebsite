const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  gender: String,
  concern: String
});

module.exports = mongoose.model('Patient', patientSchema);
