import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/user-model.js";

function createToken(userId) {
  return jwt.sign({userId}, process.env.JWT_SECRET);
}

async function validUserLogin(userName, password, role) {
  try {
    const userInfo = await UserModel.findOne({userName});
    if (!userInfo) {
      return {success: false, message: "User does not exists"};
    }

    const isMatch = await bcrypt.compare(password, userInfo.password);
    if (!isMatch) {
      return {success: false, message: "Invalid credentials"};
    }

    if (role !== userInfo.role) {
      return {success: false, message: "User access denied"};
    }

    const token = createToken(userInfo._id);
    return {success: true, token};
  } catch (error) {
    console.log("Can not login with error: ", error);
    return {success: false, message: error.message};
  }
}

// Route for user login
async function loginUser(req, res) {
  const {userName, password} = req.body;
  return res.json(await validUserLogin(userName, password, "CLIENT"));
}

// Route for admin login
async function adminLogin(req, res) {
  const {userName, password} = req.body;
  return res.json(await validUserLogin(userName, password, "ADMIN"));
}

// Route for user register
async function registerUser(req, res) {
  try {
    const {userName, email, password} = req.body;
    if (!userName) {
      return res.json({success: false, message: "UserName is not empty"});
    }
    if (!email) {
      return res.json({success: false, message: "Email is not empty"});
    }

    // checking user already exists or not
    const existUser = await UserModel.find({$or: [ {email}, {userName} ]});
    if (existUser.length > 0) {
      return res.json({success: false, message: "User already exists"});
    }

    // validating email format
    if (!validator.default.isEmail(email)) {
      return res.json({success: false, message: "Please enter a valid email"});
    }
    // strong password
    if (password.length < 8) {
      return res.json({success: false, message: "Please enter a strong password"});
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // saved user
    const newUser = new UserModel({
      userName, email,
      role: "CLIENT",
      password: hashedPassword,
    });
    const user = await newUser.save();
    console.log("User registered: ", user);

    // create token
    const newToken = createToken(user._id);
    return res.json({success: true, newToken});
  } catch (error) {
    console.log("Can not register user: ", error);
    return res.json({success: false, message: error.message});
  }
}

export {
  loginUser,
  registerUser,
  adminLogin
};
