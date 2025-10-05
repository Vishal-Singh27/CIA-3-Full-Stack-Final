import Comments from "../Models/Comments.js"

export default async function (req, res) {
    try {
        var comments = await Comments.find();

        res.status(201).json(comments);
    } catch (e) {
        res.status(405).json({message: "Internal server error.."});
    }
}