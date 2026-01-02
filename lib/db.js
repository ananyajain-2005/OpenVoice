import mongoose from "mongoose";
  let isConnected = false;
export const db = async () => {
     if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("mongodb connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}