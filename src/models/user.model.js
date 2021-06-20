const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 4,
      max: 255
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    }
  }
)

/**
 * @typedef User
 */
 const User = mongoose.model('User', userSchema);

 module.exports = User;