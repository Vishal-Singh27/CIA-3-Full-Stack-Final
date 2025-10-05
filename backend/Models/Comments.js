import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    username: String
    ,
    post_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Post"
    },
    comment: {
        type: String,
        required: true
    }
})

const Comments = mongoose.model("Comments", commentSchema);
export default Comments;