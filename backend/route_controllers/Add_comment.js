import Comments from "../Models/Comments.js"
import User from "../Models/User.js";

export default async function (req, res) {
    try {
        let user_id = req.body.user_id;
        let post_id = req.body.post_id;
        let comment = req.body.comment;
        let username = (await User.findById(req.body.user_id)).username;

        var posted_comment = await Comments({"user_id": user_id, "post_id": post_id, "comment": comment, "username": username});
        await posted_comment.save();
        res.status(201).json(posted_comment);
    } catch (e) {
        res.status(405).json({message: "Internal server error.."});
    }
}