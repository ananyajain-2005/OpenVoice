'use client';
import React, { useEffect, useState } from "react";
import UserContext from "./userContext";

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };
    return (
        <UserContext.Provider value={{ user, setUser, logout ,loading}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;


