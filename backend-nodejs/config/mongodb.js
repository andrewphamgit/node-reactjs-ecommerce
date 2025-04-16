import mongoose from "mongoose";

const CONNECT_MONGODB = async () => {
  mongoose.connection.on('connected', () => {
    console.log("DB connected");
  });

  await mongoose.connect(`${process.env.MONGODB_URI}`, {
    dbName: "e-commerce"
  });
}

export default CONNECT_MONGODB;