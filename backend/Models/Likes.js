import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    post_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Post"
    }
})

const Likes = mongoose.model("Likes", likesSchema);
export default Likes;