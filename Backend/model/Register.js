// models/Register.js
const mongoose = require('mongoose');
const db = require('../database/connection');

const registerSchema = new mongoose.Schema({
  // Define the fields for Register model
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date
  }
});

const Register = db.model('Register', registerSchema);

module.exports = Register;
