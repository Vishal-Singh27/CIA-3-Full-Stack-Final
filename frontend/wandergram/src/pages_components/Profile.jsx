import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './Context';
import { Post } from "./Post";
import axios from 'axios';
import { Link, useParams } from 'react-router';
import { motion } from "framer-motion";

export const Profile = () => {
  let { username } = useParams();  
  const { user, isLoggedIn } = useContext(AuthContext);

  const [posts, setPosts] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [following, isFollowing] = useState(false);

  useEffect(() => {
    async function load_data() {
      let response = await axios.get(`http://localhost:5002/posts/${username}`);
      let data = response.data;
      if (data.message){
        setEmpty(true);
      } else {
        let follower_res = await axios.get(`http://localhost:5002/user/followers/${username}`);
        let followers = follower_res.data.Followers;
        isFollowing(followers.includes(user));
        setEmpty(false);
        setPosts(data);
      }
      setLoaded(true);
    }
    load_data();
  }, [username, user]);

  if (!loaded) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-gray-300">
        Feed is loading....
      </div>
    );
  }

  if (empty) {
    return (
      <div className="h-screen" style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div
          className="h-screen w-screen relative py-4"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
        <div className="blur-overlay"></div>
        <div className="z-10 items-center">
          {/* Follow/Unfollow Button */}
          <div className='text-center left-1/2 relative transform -translate-x-1/2'>
            Username: {username}<div className='mt-2'>
          {user !== username && isLoggedIn && (
            <div>
              {following ? (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={async () => {
                    await axios.post(`http://localhost:5002/user/${username}/unfollow`, { username: user });
                    isFollowing(false);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={async () => {
                    await axios.post(`http://localhost:5002/user/${username}/follow`, { username: user });
                    isFollowing(true);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
            
          )}</div></div>
          <hr className='flex relative mt-4 mb-2'/>
          <div className="relative z-10 h-full flex items-center justify-center text-xl text-amber-50 text-center px-4">
            
            {user === username ? (
              <div>
                You haven't posted anything yet! <Link to="/add_post"><u>Add Post</u></Link>
              </div>
            ) : (
              <div>{username} hasn't posted anything yet!</div>
            )}
          </div>
        </div></div>
      </div>
    );
  }

  return (
    <div className="h-screen" style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div
          className="h-screen w-screen relative py-4"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
        {/* Blurred overlay */}
        <div className="blur-overlay"></div>


        <div className="z-10 items-center">
          {/* Follow/Unfollow Button */}
          <div className='text-center left-1/2 relative transform -translate-x-1/2'>
            Username: {username}<div className='mt-2'>
          {user !== username && isLoggedIn && (
            <div>
              {following ? (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={async () => {
                    await axios.post(`http://localhost:5002/user/${username}/unfollow`, { username: user });
                    isFollowing(false);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={async () => {
                    await axios.post(`http://localhost:5002/user/${username}/follow`, { username: user });
                    isFollowing(true);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
            
          )}</div></div>
        <hr className='flex relative mt-4 mb-1'/>
        {/* Two column layout */}
        <motion.div
          className="z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-50 rounded-xl flex relative">
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
      </div>
    </div>
  );
};
