import jwt from "jsonwebtoken";
import UserModel from "../models/user-model.js";

const adminAuth = async (req, res, next) => {
  try {
    const {token} = req.headers;
    if (!token) {
      return res.json({success: false, message: "Not authorized"});
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    const userInfo = await UserModel.findOne({_id: tokenDecode.userId});
    if ("ADMIN" !== userInfo.role) {
      return res.json({success: false, message: "Not authorized"});
    }

    next();
  } catch (error) {
    console.log("Can not access function: ", error);
    return res.json({success: false, message: error.message});
  }
}

export default adminAuth;