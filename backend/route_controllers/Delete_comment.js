import Comments from "../Models/Comments.js"

export default async function (req, res) {
    try {
        await Comments.findByIdAndDelete(req.body.id);
        res.status(201).json({message: "Comment Deleted"});
    } catch (e) {
        res.status(405).json({message: "Internal server error.."});
    }
}