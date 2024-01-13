// models/Admin.js
const mongoose = require('mongoose');
const db = require('../database/connection');

const adminSchema = new mongoose.Schema({
  // Define the fields for Admin model
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date
  }
});

const Admin = db.model('Admin', adminSchema);

module.exports = Admin;
