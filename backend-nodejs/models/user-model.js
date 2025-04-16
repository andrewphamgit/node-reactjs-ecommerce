import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  name: {type:String, required: false},
  password: {type: String, required: true},
  role: {type: String, enum:['ADMIN', "PARTNER", "CLIENT"], required: true, default: "CLIENT"},
  cartData: {type: Object, default: {}},
}, {minimize: false});

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

export default UserModel;