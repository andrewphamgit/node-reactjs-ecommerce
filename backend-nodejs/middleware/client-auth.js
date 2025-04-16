import jwt from "jsonwebtoken";
import UserModel from "../models/user-model.js";

const clientAuth = async (req, res, next) => {
  try {
    const {token} = req.headers;
    if (!token) {
      return res.json({success: false, message: "Not authorized"});
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    const userInfo = await UserModel.findById(tokenDecode.userId);
    if ("CLIENT" !== userInfo.role) {
      return res.json({success: false, message: "Not authorized"});
    }

    req.body.userId = tokenDecode.userId;
    next();
  } catch (error) {
    console.log("Can not access function: ", error);
    return res.json({success: false, message: error.message});
  }
}

export default clientAuth;