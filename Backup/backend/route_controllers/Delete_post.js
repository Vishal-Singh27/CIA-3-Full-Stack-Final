import Post from "../Models/Post.js";

export default async function (req, res) {
    try {
        await Post.findOneAndDelete({_id: req.params.id});
        res.status(200).json({message: "Deleted"});
    } catch (e) {
        res.status(500).json({message: "Internal server error: " + e});
    }
}