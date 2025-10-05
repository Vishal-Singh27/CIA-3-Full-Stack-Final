import Location from "../Models/Location.js";
import Post from "../Models/Post.js";

export default async function(req, res) {
    try
    {
        let posts = await Post.find({location: req.params.id});
        if (posts.length == 0) return res.status(200).json({message: "No posts found related to that location"});
        let avg = 0;

        for (let post of posts) {
            avg += post["rating"];
        }

        avg /= posts.length;

        let newLocation = await Location.findByIdAndUpdate(req.params.id, {"avg_rating": avg}, {new: true});
        res.status(201).json(newLocation);
    } catch (e) {
        res.status(500).json({message: "Internal error: " + e});
    }
}