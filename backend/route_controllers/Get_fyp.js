import Post from "../Models/Post.js";
import User from "../Models/User.js";

export default async function (req, res) {
    try
    {
        const creator = await User.findOne({username: req.body.username});
        if (!creator) return res.status(404).json({message: "Creator not found"});

        const posts = await Post.find({user: {$in: creator.following}})
        if (posts.length == 0) {
            return res.status(200).json({message: "No posts found"});
        }
        res.status(200).json(posts);
    } catch (e) {
        return res.status(500).json({message: "Internal Error"});
    }
}