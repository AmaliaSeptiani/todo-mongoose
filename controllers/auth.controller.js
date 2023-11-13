require("dotenv").config()
const jwt = require('jsonwebtoken');
const User = require("../models/user")

module.exports = {
  login: async (req, res) => {
    const userLogin = req.body 

    try {
      const user = await User.findOne({email: userLogin.email})
      if (!user) throw new Error("invalid user")
  
      console.log(user.password, userLogin.password);
      if (user.password !== userLogin.password) throw new Error("invalid user")
  
      const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_KEY)
  
      res.json({
        message: "login successfull",
        userId: user._id,
        token,
      })
    } catch (error) {
      res.json(error.message)
    }
  },

  regis: async (req, res) => {
    try {
      const userData = req.body;

      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('Email is already registered');
      }

      const newUser = await User.create(userData);
      const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_KEY);

      res.json({
        message: 'Registration successful',
        userId: newUser._id,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  },

}