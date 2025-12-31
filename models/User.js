import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    otp: String,
    otpExpiry: Date,
    isVerified: { type: Boolean, default: false }
});
export default mongoose.models.User || mongoose.model("User", userSchema);