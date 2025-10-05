import Likes from "../Models/Likes.js"
import User from "../Models/User.js";

export default async function (req, res) {
    try {
        let likes = await Likes.find({post_id: req.params.post_id});
        let users = []

        for (let like of likes) users.push((await User.findById(like.user_id)).username);
        
        res.status(201).json({"Users": users});
    } catch (e) {
        res.status(500).json({message: "Internal server error: " + e});
    }
}