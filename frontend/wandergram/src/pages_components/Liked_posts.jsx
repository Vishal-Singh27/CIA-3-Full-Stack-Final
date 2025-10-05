import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './Context';
import { Post } from "./Post";
import axios from 'axios';
import { Link } from 'react-router';
import { motion } from "framer-motion";


export const Liked_posts = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    async function load_data() {
      let response = await axios.get(`http://localhost:5002/posts/liked/${user}`);
      let data = response.data;
      if (data.message) {
        setEmpty(true);
      } else {
        setEmpty(false);
        setPosts(data);
      }
      setLoaded(true);
    }
    load_data();
  }, [user]);

  if (!loaded) {
    return (
      <div className='h-screen flex items-center justify-center text-xl text-gray-300'>
        Feed is loading...
      </div>
    );
  }

  if (empty) {
    return (
      <div className="h-screen relative">
        {/* Blurred background */}
        <div className="blur-overlay" style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>

        <div className="relative z-10 h-full flex items-center justify-center text-xl text-gray-400">
          You haven't liked anything yet!
        </div>
      </div>
    );
  }

  return (
      <div
        className="h-screen w-screen relative flex py-8"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Blurred overlay */}
        <div className="blur-overlay"></div>

        {/* Two column layout */}
        <motion.div
          className="z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className='mb-3'>Your Liked Posts: </div>
          <div className="w-50 rounded-xl flex">
            {posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-1 m-2 rounded-xl"
              >
                <div className="text-white hover:shadow p-3 w-40 h-full hover:cursor-pointer">
                  <Post data={post} />
                </div>
               </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
};
