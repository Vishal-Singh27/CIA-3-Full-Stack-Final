import Post from "../Models/Post.js"
import User from "../Models/User.js";
import Location from "../Models/Location.js";

export default async function (req, res) {
    try {
        let new_post = Post(req.body);
        
        await new_post.save();
        
        // Linking the post to the user
        const prev = await User.findById(new_post.user);
        await User.findByIdAndUpdate(new_post.user, {$push: {posts: new_post._id}});
        res.status(201).json(new_post);
    } catch (e) {
        if (e.name == "ValidationError"){
            console.log(e.message);
            res.status(400).json({message: e.message})
        }

        else
            res.status(500).json({message: "Data couldnt be added"});
    }
}