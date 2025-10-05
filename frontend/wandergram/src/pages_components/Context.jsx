// Context.js
import axios from "axios"
import React, { createContext, useContext, useState, useEffect } from 'react';
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router";

// Create the AuthContext
export const AuthContext = createContext(null);

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    let navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Placeholder for API call functions
    const login = async (userData) => {
        let entered_username = userData.username;
        let entered_password = userData.password;
        try {
            let res = await axios.post("http://localhost:5002/user/login/check", {
                username: entered_username,
                password: entered_password
            });
            if (await res.data.message == "Login successfull!") {
                setUser(userData.username);
                setIsLoggedIn(true);
                toast.success("Logged in!");
                // Storing in local storage
                localStorage.setItem("user", entered_username);
                navigate("/");
            }
            else {
                toast.error("Wrong Password or Username!");
            }
        } catch (e) {
            toast.error("Internal error: " + e);
            return false;
        }
        
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.setItem("user", "");
        navigate("/");
    };

    const signup = async (userData) => {
        try {
            let user = userData.username;
            let pass = userData.password;

            await axios.post("http://localhost:5002/user/add", {
                username: user,
                password: pass
            })
            toast.success("User Created!");
            setUser(user);
            setIsLoggedIn(true);
            localStorage.setItem("user", user);
        } catch (e) {
            toast.error("Internal Error: " + e);
        }
        navigate("/");
    };

    // This effect runs once on mount to check for an existing login session
    useEffect(() => {
        console.log("Checking for existing login session...");
        let current = localStorage.getItem("user");
        if (current) {
            setUser(current);
            setIsLoggedIn(true);
        }
    }, []);

    const value = { user, isLoggedIn, login, logout, signup };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
