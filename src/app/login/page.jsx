'use client';
import Form from "../../app/components/form";
import UserContext from "../context/userContext";
import { useContext , useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
   const { user } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    
    if (user) {
      router.replace("/dashboard");
    }
  }, [user]);
  
  if (user) return null;

  return <><Form type="login"/></>
};

export default Login;
