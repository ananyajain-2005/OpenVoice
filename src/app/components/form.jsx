'use client'
import { useContext, useState } from "react";
import Button from "./button";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import UserContext from "../context/userContext";

const Form = () => {
  const [type, setType] = useState('login'); // login or signup
  const [phase, setPhase] = useState("login"); // login, signup, otp
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);


  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  // Toggle between login and signup
  const toggleType = () => {
    setType(prev => (prev === 'login' ? 'signup' : 'login'));
    setPhase('login');
    setEmail('');
    setPassword('');
    setUserName('');
    setErrors({ email: '', password: '' });
  };
   //otp verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/verifyotp", {
        email: email.toLowerCase().trim(),
        otp: otp.toString().trim(),
      });
      toast.success(data.message || "OTP Verified 🎉");
      setOtp('');
      setPhase("login");  // show login form
      setType("login");   // ensure login fields show
      setPassword('');
      setUserName('');
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid OTP ❌");
    }
  };

  // Login / Signup handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { email: '', password: '' };

    if (!emailRegex.test(email)) newErrors.email = 'Please enter a valid email address';
    if (!passwordRegex.test(password) && type === 'signup')
      newErrors.password = 'Password must be at least 8 chars, include upper, lower & number';

    setErrors(newErrors);
     if (newErrors.email || newErrors.password) return;

    setLoading(true);
    try {
      if (type === 'login') {
        // Login
        const { data } = await axios.post("/api/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        toast.success(data.message || "Login successful 🎉");
        router.push("/dashboard");
      } else {
        // Signup
        const { data } = await axios.post("/api/auth/signup", { userName, email, password });
        toast.success(data.message || "Signup successful 🎉 OTP sent to your email");
        setPhase("otp");
        setEmail(data.user.email); // keep email
        setPassword('');
        setUserName('');
        setOtp('');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#B8E3E9] min-h-screen flex justify-center items-center">
      <form
        className="bg-white flex flex-col w-full max-w-md rounded-xl p-5 py-9"
        onSubmit={phase === "otp" ? handleVerifyOtp : handleSubmit}
        autoComplete="on"
        noValidate
      >
        {/* Header */}
        <div className="flex flex-col justify-center items-center text-center">
          {phase === "otp" ? (
            <h1 className="text-4xl font-bold mb-5">Verify OTP</h1>
          ) : type === 'login' ? (
            <h1 className="text-5xl font-bold mb-5 px-3">Welcome Back to OpenVoice</h1>
          ) : (
            <h1 className="text-5xl font-bold mb-5">Join OpenVoice</h1>
          )}
          {phase !== "otp" && (
            <h2 className="text-lg">
              Sign {type === 'login' ? 'in' : 'up'} to start your anonymous adventure
            </h2>
          )}
        </div>

        {/* Form Fields */}
        <div className="mt-5 p-4 w-full">
          {phase === "otp" ? (
            <>
              <p className="text-sm mb-2">OTP sent to {email}</p>
              <input
                type="email"
                value={email}
                readOnly
                className="border border-gray-300 rounded-lg p-2 w-full mt-2 mb-2 bg-gray-100"
              />
              <label className="font-semibold">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full mt-2 mb-5"
                placeholder="6-digit OTP"
              />
            </>
          ) : type === 'login' ? (
            <>
              <label className="font-semibold">Email</label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full mt-2 mb-5"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <label className="font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full mt-2"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-5 text-gray-500"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </>
          ) : (
            <>
              <label className="font-semibold">Username</label>
              <input
                type="text"
                autoComplete="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full mt-2 mb-5"
              />

              <label className="font-semibold">Email</label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full mt-2 mb-5"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <label className="font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full mt-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-5 text-gray-500"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </>
          )}
        </div>

        {/* Button */}
        <Button
          type="submit"
          label={loading ? "please wait..." : phase === 'otp' ? "Verify OTP" : type === 'login' ? "Sign in" : "Sign Up"}
          variant="secondary"
          buttonStyles="w-70 mx-13 my-3"
          disabled={loading}
        />

        {/* Toggle */}
        {phase !== "otp" && (
          type === 'login' ? (
            <p className="text-center text-lg mt-4">
              Not a member yet? <button type="button" onClick={toggleType} className="px-3 text-blue-500">Sign up</button>
            </p>
          ) : (
            <p className="text-center text-lg mt-4">
              Already a member? <button type="button" onClick={toggleType} className="px-3 text-blue-500">Sign in</button>
            </p>
          )
        )}
      </form>
    </div>
  );
};

export default Form;