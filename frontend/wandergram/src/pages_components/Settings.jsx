import axios from 'axios'
import React from 'react'
import { AuthContext } from './Context';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export const Settings = () => {
  const {user, logout} = React.useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className='h-screen flex-col flex items-center'>
        <h1 className='text-2xl'>Settings</h1>
        <br />
        Delete Account:
        <button className='btn mt-2' onClick={async () => {
          await axios.post("http://localhost:5002/user/delete", {username: user})

          toast.success("Account Deleted");
          logout();
        }}> Delete Account </button>
        <h1></h1>
    </div>
  )
}
