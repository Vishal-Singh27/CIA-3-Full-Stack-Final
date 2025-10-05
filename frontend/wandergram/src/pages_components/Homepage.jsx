import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Context";
import { Post } from "./Post";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router";


export const Homepage = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      async function load_data() {
        let response = await axios.post("http://localhost:5002/fyp/", { username: user });
        let data = response.data;
        if (data.message === "No posts found") setEmpty(true);
        else setPosts(data);
        setLoaded(true);
      }
      load_data();
    }
  }, [isLoggedIn, user]);

  // Logged-in feed
  if (isLoggedIn) {
    if (!loaded) {
      return (
        <div className="h-screen flex items-center justify-center text-xl font-semibold text-gray-300 animate-pulse">
          Feed is loading...
        </div>
      );
    }

    if (empty) {
      return (
        <div className="h-screen flex items-center justify-center text-xl font-semibold text-gray-400 animate-fade-in">
          Your feed is empty
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
          <div className="w-50 rounded-xl flex">
            {posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl border-1 m-2 "
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
  }

  // Guest landing page
  return (
    <div
      className="h-screen w-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blurred overlay */}
      <div className="blur-overlay"></div>

      <div className="relative z-10 flex w-full h-full items-center justify-between px-20">
        <div className="max-w-lg text-white">
          <h1 className="text-5xl font-bold mb-6">
            Share your travel experiences
          </h1>
          <p className="text-lg text-gray-200">
            Join our community and connect with travel enthusiasts from around the world
          </p>
        </div>

        <div className="login-card">
          <h2 className="text-2xl font-bold mb-6">Welcome to Wandergram</h2>
          <Link to="/login" className="text-blue-800">
            Login First
          </Link>
        </div>
      </div>
    </div>
  );
};
