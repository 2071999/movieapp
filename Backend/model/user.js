// models/User.js
const mongoose = require('mongoose');
const db = require('../database/connection');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Add more fields as needed
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date
  }
});

const User = db.model('User', userSchema);

module.exports = User;
