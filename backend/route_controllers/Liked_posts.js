import Likes from "../Models/Likes.js"
import User from "../Models/User.js"
import Post from "../Models/Post.js"

export default async function (req, res) {
    try {
        let user = await User.findOne({username: req.params.username})
        let likes = await Likes.find({user_id: user._id});

        let posts = [];

        for (let like of likes) {
            let post = await Post.findById(like.post_id);
            if (post) posts.push(post);
        }

        if (posts.length == 0)
            res.status(201).json({"message": "No posts liked"});
        res.status(201).json(posts);
    } catch (e) {
        res.status(500).json({message: "Internal server error: " + e});
    }
}