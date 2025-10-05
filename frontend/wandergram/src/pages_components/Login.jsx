import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from './Context';
import { Link, useNavigate } from 'react-router';
import './GlowForm.css'; // same CSS as Signup
import logo from '../../../wandergram/logo.png';

export const Login = () => {
    const { register, handleSubmit, getValues } = useForm();
    const navigate = useNavigate();
    const { login, isLoggedIn } = React.useContext(AuthContext);
    const [focusColor, setFocusColor] = useState('#00ffff'); // default cyan

    const onSubmit = async () => {
        let name = getValues("name");
        let pass = getValues("pass");

        await login({ username: name, password: pass });

        if (isLoggedIn) {
            navigate("/");
        } else {
            document.getElementById("pass_login").value = "";
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black">
            {/* Background logo with animation */}
            <img 
                src={logo} 
                alt="Logo" 
                className="absolute inset-0 m-auto w-3/4 opacity-10 pointer-events-none z-0 animate-pulse-slow"
            />

            {/* Login Form */}
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-10 bg-white/20 backdrop-blur-md border-2 rounded-2xl p-10 w-80 flex flex-col glow-border"
                style={{ '--glow-color': focusColor }}
            >
                <h2 className="text-center text-3xl font-bold text-white mb-6">Login</h2>

                <label className="text-white mb-1">Name:</label>
                <input 
                    type="text" 
                    className="mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white" 
                    {...register("name")}
                    onFocus={() => setFocusColor('#00ffff')} 
                />

                <label className="text-white mb-1">Password:</label>
                <input 
                    id="pass_login" 
                    type="password" 
                    className="mb-6 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white" 
                    {...register("pass")}
                    onFocus={() => setFocusColor('#ff69b4')} 
                />

                <input 
                    type="submit" 
                    value="Login" 
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded cursor-pointer transition-all shadow-md hover:shadow-lg"
                />

                <div className='mt-3 text-center'>
                    <Link to="/signup" className='underline text-blue-500'>Sign up</Link> instead
                </div>
            </form>
        </div>
    )
}
