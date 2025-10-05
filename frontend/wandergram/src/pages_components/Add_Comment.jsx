import React from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from './Context';
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { motion } from "framer-motion";

export const Add_comment = () => {
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  let { id } = useParams();
  const { user } = React.useContext(AuthContext);

  const onSubmit = async () => {
    try {
      let user_id = (await axios.post("http://localhost:5002/user/find_id", { "username": user })).data.id;
      let comment = getValues("comment");
      
      await axios.post("http://localhost:5002/comments/add", {
        "user_id": user_id,
        "post_id": id,
        "comment": comment
      });
      toast.success("Comment Posted!");
      navigate(`/post/${id}`); // redirect after adding post
    } catch (e) {
      toast.error("Comment couldn't be added: " + e);
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
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Add New Comment</h2>

        {/* Posted by */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Post Id:</label>
          <input type="text" value={id || ""} disabled className="input input-bordered bg-gray-200 cursor-not-allowed"/>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Posted by:</label>
          <input type="text" value={user || ""} disabled className="input input-bordered bg-gray-200 cursor-not-allowed"/>
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Comment:</label>
          <input type="text" {...register("comment")} className="input input-bordered focus:ring-2 focus:ring-indigo-400" placeholder="Enter the comment" />
        </div>

        <div className="flex justify-center mt-4">
          <button type="submit" className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-indigo-500 shadow-lg transition-all duration-300">
            Post Comment
          </button>
        </div>
      </motion.form>
    </div>
  );
};
