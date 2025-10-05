import React, { use } from 'react'
import { get, useForm } from "react-hook-form"
import { AuthContext } from './Context'
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router'
import axios from 'axios'

const Signup = () => {
    const { register, handleSubmit, state, formState: {errors}, getValues } = useForm();
    const navigate = useNavigate();
    const {user, isLoggedIn, signup} = React.useContext(AuthContext);

    return (
        <>
            <div className='min-h-screen min-w-screen flex justify-center'>
                <form onSubmit={handleSubmit(async () => {
                    let name = getValues("name");
                    let pass = getValues("pass");
                    let c_pass = getValues("c_pass");
                    if (pass != c_pass) {
                        toast.error("Password and confirm password must be the same");
                        document.getElementById("pass").value = "";
                        document.getElementById("c_pass").value = "";
                        return;
                    }

                    signup({username: name, password: pass});
                    navigate("/");
                })}>
                    <label className='flex justify-center text-3xl'>Signup Form</label><br />
                    <label>Name: </label>
                    <input name='name' type='text' className='input' {...register("name")}/>
                    <br />
                    <label>Password: </label>
                    <input name='pass' id="pass" type='password' className='input' {...register("pass")}/>
                    <br />
                    <label>Confirm Password: </label>
                    <input name='c_pass' id="c_pass" type='password' className='input' {...register("c_pass")}/>
                    <br />
                    <div className='flex justify-center'><input type='submit' value={"Sign Up"} className='border-2 mt-5 w-20' /></div>
                </form>
            </div>
        </>
    )
}

export default Signup;