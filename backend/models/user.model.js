// Defines the user model for our app

// Defines a username, password for login and a displayname to show on Application
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
});

module.exports = mongoose.model('user', userSchema);
