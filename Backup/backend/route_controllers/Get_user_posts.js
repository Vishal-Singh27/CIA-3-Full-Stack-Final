import Post from "../Models/Post.js";
import User from "../Models/User.js";

export default async function(req, res) {
    try {
        const user = await User.findOne({username: req.params.id});
        if (!user) return res.status(404).json({message: "User not found"})

        const posts = await Post.find({user: user._id});

        if (!posts) return res.status(200).json({message: `${user.username} has no posts`});
        res.status(200).json(posts);
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}