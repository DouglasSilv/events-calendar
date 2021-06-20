const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async user => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  
  const newUser = new User({
    username: user.username,
    password: hashedPassword
  })

  return await newUser.save();
};

const login = async userRequest => {
  const user = await User.findOne({ username: userRequest.username });
  if (!user) return new Error("Incorrect username");
  const isPasswordValid = await bcrypt.compare(userRequest.password, user.password);
  if (!isPasswordValid) return new Error("Incorrect password");

  try {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    return token;
  } catch (error) {
    return error;
  }
}

module.exports = {
  register,
  login
}