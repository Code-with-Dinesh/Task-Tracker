
const userModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
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

