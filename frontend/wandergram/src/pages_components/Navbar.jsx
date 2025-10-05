import React, { useContext, useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './Context';
import { useEffect } from 'react';
import axios from 'axios';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, changeUsers] = useState([]);

  useEffect(function() {
    const load_users = async function () {
      changeUsers(await (await axios.get("http://localhost:5002/users")).data)
    }
    load_users();
  }, [])

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // Redirect to a user search page with the query
      navigate(`/profile/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // clear after search
    }
  };

  // Handle Enter key in input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      e.preventDefault(); // prevent form submit reload
    }
  };

  return (
    <div className="navbar bg-black bg-opacity-80 shadow-sm px-4 h-20 flex items-center text-xl">
      {/* Left side with logo */}
      <div className="flex-1 flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/logo.png"   
            alt="Wandergram Logo"
            className="h-12 w-auto"
          />
        </Link>
      </div>

      {/* Middle navigation (only when logged in) */}
      {isLoggedIn && (
        <div className="flex items-center gap-4">
          <Link to={"/"} className="text-white hover:text-cyan-400">Following</Link>
          <Link to={"/add_post"} className="text-white hover:text-cyan-400">Add Post</Link>
        </div>
      )}

      {/* Right side: search bar + profile */}
      <div className="flex items-center gap-4 m-3">
          <div className="flex items-center gap-2 ">
            <datalist id="users">
              { users.map(user_data => (<option value={user_data.username}/>))}
            </datalist>
            <input
              type="text"
              placeholder="Search users..."
              className="input input-bordered input-sm bg-white text-black w-48 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              KeyPress={handleKeyPress}
              list='users'
            />
            
            <button
              className="btn btn-sm btn-primary text-lg"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        

        {/* Profile avatar dropdown */}
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {isLoggedIn && <li><Link to={`/profile/${user}`}>Profile</Link></li>}
              {isLoggedIn && <li> <Link to="/user/liked">Liked Posts</Link></li>}
              {isLoggedIn && <li><Link to="/settings">Settings</Link></li>}
              {isLoggedIn ? (<div>
                <li><a onClick={() => logout()}>Logout</a></li>
                </div>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Signup</Link></li>
                </>
              )}
            </ul>
            
          </div>
        </div>
      </div>
    </div>
  );
};
