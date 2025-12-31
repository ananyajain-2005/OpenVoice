'use client';
import Form from "../../app/components/form";
import UserContext from "../context/userContext";
import { useContext , useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
   const { user } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    // 🔐 agar user already login hai
    if (user) {
      router.replace("/dashboard"); // back se login page nahi aayega
    }
  }, [user]);
  
  // 🛑 jab tak redirect ho raha hai tab kuch render mat karo
  if (user) return null;

  return <><Form type="login"/></>
};

export default Login;
