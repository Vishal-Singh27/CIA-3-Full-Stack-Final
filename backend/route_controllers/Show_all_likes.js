import Likes from "../Models/Likes.js"

export default async function (req, res) {
    try {
        let likes = await Likes.find();
        if (likes.length == 0) return res.status(200).json({message: "No likes in the database!"});
        res.status(201).json(likes);
    } catch (e) {
        res.status(500).json({message: "Internal server error: " + e});
    }
}