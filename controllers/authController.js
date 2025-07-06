const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { fullName, email, phone, password, gender, concern } = req.body;

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = new Patient({
      fullName,
      email,
      phone,
      password: hashedPassword,
      gender,
      concern
    });

    await patient.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: patient._id, fullName: patient.fullName } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
