import Post from "../Models/Post.js"
import User from "../Models/User.js";

export default async function (req, res) {
    try {
        // Linking the post to the user
        const user = await User.findOne({username: req.params.username});
        let followers = [];
        for (let follower of user.followers) {
            followers.push((await User.findById(follower)).username);
        }
        res.status(201).json({"Followers": followers});
    } catch (e) {
        if (e.name == "ValidationError"){
            console.log(e.message);
            res.status(400).json({message: e.message});
        }

        else
            res.status(500).json({message: "Data couldnt be added"});
    }
}