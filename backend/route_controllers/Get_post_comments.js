import Comments from "../Models/Comments.js"

export default async function (req, res) {
    try {
        var comments = await Comments.find({post_id: req.params.post_id});

        res.status(201).json(comments);
    } catch (e) {
        res.status(405).json({message: "Internal server error.."});
    }
}