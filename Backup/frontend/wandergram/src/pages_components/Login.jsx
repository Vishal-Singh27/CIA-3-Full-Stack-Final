import React, { use } from 'react'
import { get, useForm } from "react-hook-form"
import { AuthContext } from './Context'
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router'
import axios from 'axios'

export const Login = () => {
    const { register, handleSubmit, state, formState: {errors}, getValues } = useForm();
    const navigate = useNavigate();
    const {user, isLoggedIn, login, logout} = React.useContext(AuthContext);

    return (
        <> 
            <div className='min-h-screen min-w-screen flex justify-center'>
                <form onSubmit={handleSubmit(async () => {
                    let name = getValues("name");
                    let pass = getValues("pass");

                    await login({username: name, password: pass})

                    if (isLoggedIn) {
                        navigate("/");
                    }
                    else {
                        document.getElementById("pass_login").value = "";
                    }
                })}>
                    <label className='flex justify-center text-3xl'>Login Form</label><br />
                    <label>Name: </label>
                    <input name='name' type='text' className='input' {...register("name")}/>
                    <br />
                    <label>Password: </label>
                    <input name='pass' id='pass_login' type='password' className='input' {...register("pass")}/>
                    <div className='flex justify-center'><input type='submit' value={"Login"} className='border-2 mt-5 w-16' /></div>
                </form>
            </div>
        </>
    )
}
