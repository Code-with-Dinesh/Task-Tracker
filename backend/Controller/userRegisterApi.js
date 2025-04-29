
const userModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()

exports.signup = async function (req, res) {
  try {
    const { name, email, password, country } = req.body;

    if (!name || !email || !password || !country) {
      return res.status(400).json({success:false, message: "All fields are required" });
    }

    const existencUser = await userModel.findOne({ email });

    if (existencUser) {
      return res.status(400).json({success:false, message: "Email is alredy used" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = await new userModel({
      name,
      email,
      password: hashpassword,
      country,
    });
    await user.save();
    
    return res
      .status(200)
      .json({ success: true, message: "user Created Successfully" });
  } catch (error) {
    console.log("Error while user Signup", error);
  }
};


exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;
     console.log(email,password)
    const user = await userModel.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_KEY,
      { expiresIn: '3h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: token
    });

  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
