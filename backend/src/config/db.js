import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URL;

if (!MONGO_URI)
  throw new Error(
    "Please define the mongo url environment variable inside .env"
  );

async function db() {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`error ${error}`);
  }
}

export default db;
