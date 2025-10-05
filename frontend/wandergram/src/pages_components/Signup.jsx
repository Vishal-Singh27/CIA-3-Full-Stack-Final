import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from './Context';
import { toast } from "react-hot-toast";
import { Link, useNavigate } from 'react-router';
import './GlowForm.css'; // Import CSS
import logo from '../../../wandergram/logo.png';

const Signup = () => {
    const { register, handleSubmit, getValues } = useForm();
    const navigate = useNavigate();
    const { signup } = React.useContext(AuthContext);
    const [focusColor, setFocusColor] = useState('#ff69b4'); // default pink

    const onSubmit = async () => {
        let name = getValues("name");
        let pass = getValues("pass");
        let c_pass = getValues("c_pass");

        if (pass !== c_pass) {
            toast.error("Password and Confirm Password must be the same");
            document.getElementById("pass").value = "";
            document.getElementById("c_pass").value = "";
            return;
        }

        await signup({ username: name, password: pass });
        navigate("/");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black" >
            {/* Background logo with animation */}
            <img 
                src={logo} 
                alt="Logo" 
                className="absolute inset-0 m-auto w-3/4 opacity-10 pointer-events-none z-0 animate-pulse-slow"
            />
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-10 bg-white/20 backdrop-blur-md border-2 rounded-2xl p-10 w-80 flex flex-col glow-border"
                style={{ '--glow-color': focusColor }}
            >
                <h2 className="text-center text-3xl font-bold text-white mb-6">Sign Up</h2>

                <label className="text-white mb-1">Name:</label>
                <input 
                    type="text" 
                    className="mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    {...register("name")}
                    onFocus={() => setFocusColor('#00ffff')} 
                />

                <label className="text-white mb-1">Password:</label>
                <input 
                    id="pass" 
                    type="password" 
                    className="mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    {...register("pass")}
                    onFocus={() => setFocusColor('#ff69b4')} 
                />

                <label className="text-white mb-1">Confirm Password:</label>
                <input 
                    id="c_pass" 
                    type="password" 
                    className="mb-6 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    {...register("c_pass")}
                    onFocus={() => setFocusColor('#ffa500')} 
                />

                <input 
                    type="submit" 
                    value="Sign Up" 
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded cursor-pointer transition-all shadow-md hover:shadow-lg"
                />
                <div className='mt-3 text-center'><Link to="/login" className='underline text-blue-500'>Sign in</Link> instead</div>
            </form>
        </div>
    )
}

export default Signup;
