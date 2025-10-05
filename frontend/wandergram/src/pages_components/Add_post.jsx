import React from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from './Context';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { motion } from "framer-motion";

export const Add_post = () => {
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);

  const onSubmit = async () => {
    try {
      let user_id = await axios.post("http://localhost:5002/user/find_id", { "username": user });
      let title = getValues("title");
      let desc = getValues("desc");
      let rating = getValues("rating");
      let picture = getValues("picture");
      let location = {
        name: getValues("p_name"),
        long: getValues("long"),
        lat: getValues("lat"),
      };
      await axios.post("http://localhost:5002/post/add", {
        "user": user_id.data.id,
        "title": title,
        "description": desc,
        "picture": picture,
        "rating": rating,
        "location": location
      });
      toast.success("Post Added");
      navigate("/"); // redirect after adding post
    } catch (e) {
      toast.error("Post couldn't be added: " + e);
    }
  };

  return (
     <div 
    className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    style={{
      backgroundImage: "url('/background.jpg')", // Add your image path here
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Dark blur overlay */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
    <motion.form 
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Add New Post</h2>

        {/* Posted by */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Posted by:</label>
          <input type="text" value={user || ""} disabled className="input input-bordered bg-gray-200 cursor-not-allowed" />
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Title:</label>
          <input type="text" {...register("title")} className="input input-bordered focus:ring-2 focus:ring-indigo-400" placeholder="Enter post title" />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Description:</label>
          <textarea {...register("desc")} className="textarea textarea-bordered focus:ring-2 focus:ring-indigo-400" placeholder="Enter description" rows={4}></textarea>
        </div>

        {/* Picture */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Picture URL:</label>
          <input type="text" {...register("picture")} className="input input-bordered focus:ring-2 focus:ring-indigo-400" placeholder="Enter picture URL" />
        </div>

        {/* Rating */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Rating:</label>
          <select {...register("rating")} className="select select-bordered focus:ring-2 focus:ring-indigo-400">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Place Name:</label>
          <input type="text" {...register("p_name")} className="input input-bordered focus:ring-2 focus:ring-indigo-400" placeholder="Enter place name" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Latitude:</label>
            <input type="text" {...register("lat")} className="input input-bordered focus:ring-2 focus:ring-indigo-400" placeholder="Latitude" />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Longitude:</label>
            <input type="text" {...register("long")} className="input input-bordered focus:ring-2 focus:ring-indigo-400" placeholder="Longitude" />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button type="submit" className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-indigo-500 shadow-lg transition-all duration-300">
            Post
          </button>
        </div>
      </motion.form>
    </div>
  );
};
