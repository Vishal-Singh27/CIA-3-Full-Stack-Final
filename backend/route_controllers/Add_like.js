import Likes from "../Models/Likes.js";
import Post from "../Models/Post.js";

export default async function (req, res) {
    var likes = await Likes(req.body);
    likes.save();
    res.status(200).json({message: "Like added!"});
}