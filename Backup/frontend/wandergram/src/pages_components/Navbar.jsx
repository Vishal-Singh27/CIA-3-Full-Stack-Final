import React from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from './Context'

export const Navbar = () => {
  const navigate = useNavigate();
  const {user, isLoggedIn, logout} = useContext(AuthContext);
  return (<div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Wandergram</a>
  </div>
  {isLoggedIn ? (<div className='button mr-4 '><Link to={"/"}>Following</Link></div>): null}
  {isLoggedIn ? (<div className='button mr-2'><Link to={"/add_post"}>Add Post</Link></div>): null}
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {isLoggedIn ? (<li><Link to="/profile">Profile</Link></li>): null}
        {isLoggedIn ? <li><Link to="/settings">Settings</Link></li>: null}
        {isLoggedIn ? (<li><a onClick={() => {logout()}}>Logout</a></li>):(<li><Link to="/login">Login</Link></li>)}
        {isLoggedIn ? null :(<li><Link to="/signup">Signup</Link></li>)}
      </ul>
    </div>
  </div>
</div>)
}
