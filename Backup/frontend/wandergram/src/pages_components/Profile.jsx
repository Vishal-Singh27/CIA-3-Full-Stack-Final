import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './Context';
import { Post } from "./Post";
import axios from 'axios';
import { Link } from 'react-router';


export const Profile = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    async function load_data() {
      let response = await axios.post("http://localhost:5002/posts/", {
        username: user
      });
      let data = response.data;
      if (data.message){
        setEmpty(true);
      }
      else {
        setPosts(data);
      }
      setLoaded(true);
    }
    load_data();
  }, [])

  if (isLoggedIn) {
    if (loaded){
      if (empty)
        return (
          <div className='h-screen text-center'>You havent posted anything yet! <Link to="/add_post"><u>Add Post</u></Link></div>
        )
      else 
        return (
          <div className='h-screen flex-wrap'>
            {posts.map(post => (
              <Post data={post} className="" />
            ))}
          </div>
        )
    }
    else {
      return (
        <div className='h-screen text-center'>Feed couldnt be loaded</div>
      );
    } 
    
  }
  else {
    return (
      <div className='text-center h-screen'>Login First!</div>
    );
  }
}
