import mongoose from "mongoose";

console.log("MONGODB_URI:", process.env.MONGODB_URI);

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  return mongoose.connect(process.env.MONGODB_URI);
}
