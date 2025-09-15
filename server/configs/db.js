import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = mongoose.connect(`${process.env.MONGODB_URI}/codeDrive`);
    console.log("connect successfully :" + (await conn).connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};
export default connectDB;
