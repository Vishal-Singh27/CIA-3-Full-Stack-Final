import Post from "../Models/Post.js"
import User from "../Models/User.js";

export default async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (post) return res.status(200).json(post);
        res.status(200).json({message: "No post found"});
    } catch (e) {
        res.status(404).json({message: "Data not found"})
    }
}