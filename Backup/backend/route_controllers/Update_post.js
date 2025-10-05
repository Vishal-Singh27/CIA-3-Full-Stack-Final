import Post from "../Models/Post.js";

export default async function (req, res) {
    try {
        const newPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!newPost) return res.status(404).json({message: "Post not found"});
        res.status(201).json(newPost);
    }
    catch (e) {
        res.status(404).json({message: "Internal error:" + e});
    }
}