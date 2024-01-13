// AuthController.js
const User = require('../models/User'); // Assuming you have a User model

// Function to authenticate a user
function authenticateUser(email, password) {
  return new Promise((resolve, reject) => {
    // Find the user by email
    User.findOne({ email }, (err, user) => {
      if (err) {
        reject(err);
      } else if (!user) {
        resolve({ success: false, message: 'User not found' });
      } else {
        // Check if the password matches
        user.comparePassword(password, (compareErr, isMatch) => {
          if (compareErr) {
            reject(compareErr);
          } else if (isMatch) {
            // Password is correct
            const userDetails = {
              email: user.email,
              fullName: user.fullName,
              // Add more details as needed
            };
            resolve({ success: true, user: userDetails });
          } else {
            // Password is incorrect
            resolve({ success: false, message: 'Incorrect password' });
          }
        });
      }
    });
  });
}

module.exports = { authenticateUser };
