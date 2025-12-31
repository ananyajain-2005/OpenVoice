import { db } from "../lib/db";
import User from "../models/User";
import generateToken from "@/app/utils/token";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import Message from "../models/message";
import { NextResponse } from "next/server";

// ------------------ OTP GENERATOR ------------------
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ------------------ SEND OTP EMAIL ------------------
async function sendEmail(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP Connected Successfully");

    await transporter.sendMail({
      from: `"OpenVoice" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OpenVoice | Email Verification",
      html: `
        <div style="font-family: Arial">
          <h2>Verify your email</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
        </div>
      `,
    });

    console.log("✅ OTP sent to:", email);
  } catch (err) {
    console.error("❌ Failed to send OTP email:", err);
    throw new Error("Email sending failed");
  }
}

// ====================== SIGNUP ======================
export const Signup = async (req) => {
  try {
    await db();
    const { userName, email, password } = await req.json();
    const emailNormalized = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: emailNormalized });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already exists" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    await User.create({
      userName,
      email: emailNormalized,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
      isVerified: false,
    });

    await sendEmail(emailNormalized, otp);

    return new Response(
      JSON.stringify({
        message: "Signup successful. OTP sent to email.",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Signup Error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
};

// ====================== VERIFY OTP ======================
export const VerifyOtp = async (req) => {
  try {
    await db();
    const { email, otp } = await req.json();
    const emailNormalized = email.toLowerCase().trim();

    const user = await User.findOne({ email: emailNormalized });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    if (user.otp !== otp) {
      return new Response(
        JSON.stringify({ error: "Invalid OTP" }),
        { status: 400 }
      );
    }

    if (user.otpExpiry < Date.now()) {
      return new Response(
        JSON.stringify({ error: "OTP expired" }),
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return new Response(
      JSON.stringify({ message: "Email verified successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Verify OTP Error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
};

// ====================== LOGIN ======================
export const Login = async (req) => {
  try {
    await db();
    const { email, password } = await req.json();
    const emailNormalized = email.toLowerCase().trim();

    const user = await User.findOne({ email: emailNormalized });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401 }
      );
    }

    if (!user.isVerified) {
      return new Response(
        JSON.stringify({ error: "Please verify your email first" }),
        { status: 403 }
      );
    }

    const token = generateToken(user);

    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          userName: user.userName,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
};

export const sendMessage = async (req) =>{
 try{
    await db();
    const {userName,message} = await req.json();
    if(!userName||!message){
      return new Response(JSON.stringify({ error: "Required fields missing" }), { status: 400 });
    }
     await Message.create({ userName, message });
     return new Response(JSON.stringify({message:"Message sent successfully"}),{status:200});
 }catch(err){
    console.error("SendMessage Error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
 }
}

export const getMessage = async(userName) =>{
  try{
    await db();
    const messages = await Message.find({userName}).sort({createdAt:-1});
    return NextResponse.json({ message: messages },{status:200});
  } catch (err) {
    console.error("FetchMessages Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}