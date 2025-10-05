import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './Context';
import { Post } from "./Post";
import axios from 'axios';

export const Homepage = () => { // Removed async
  const { user, isLoggedIn } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    async function load_data() {
      let response = await axios.post("http://localhost:5002/fyp/", {
        "username": user
      });
      let data = response.data;
      if (data.message == "No posts found"){
        console.log("Empty");
        setEmpty(true);
      }
      else {
        console.log(data)
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
          <div className='h-screen text-center'>Your feed is empty</div>
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
};