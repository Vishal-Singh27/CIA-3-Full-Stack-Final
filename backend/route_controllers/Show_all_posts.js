import Post from "../Models/Post.js"

export default async function (req, res) {
    try {
        let posts = await Post.find();
        if (posts.length == 0) return res.status(200).json({message: "No posts in the database!"});
        res.status(201).json(posts);
    } catch (e) {
        res.status(500).json({message: "Internal server error: " + e});
    }
}