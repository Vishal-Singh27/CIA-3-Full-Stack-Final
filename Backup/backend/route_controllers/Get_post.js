import Post from "../Models/Post.js"
import User from "../Models/User.js";

export default async function (req, res) {
    try {
        const user = await User.findOne({"username": req.body.username});
        const post = await Post.find({"user": user._id});
        if (post.length > 0) return res.status(200).json(post);
        res.status(200).json({message: "No post found"});
    } catch (e) {
        res.status(404).json({message: "Data not found"})
    }
}