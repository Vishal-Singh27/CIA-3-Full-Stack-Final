import Likes from "../Models/Likes.js";

export default async function (req, res) {
    var liked = await Likes.findOne(req.body);
    if (!liked) res.status(404).json({message: "Like not in the database!"});

    await Likes.findByIdAndDelete(liked._id)
    res.status(200).json({message: "Like removed!"});
}