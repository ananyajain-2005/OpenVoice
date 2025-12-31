import mongoose from "mongoose";
  let isConnected = false;
export const db = async () => {
     if (isConnected) return;
    try {
        await mongoose.connect('mongodb://localhost:27017/trueFeedback');
        isConnected = true;
        console.log("mongodb connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}