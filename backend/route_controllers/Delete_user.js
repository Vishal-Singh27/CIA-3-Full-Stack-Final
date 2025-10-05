import User from "../Models/User.js";

export default async function (req, res) {
    try {
        await User.findOneAndDelete({username: req.body.username});
        res.status(200).json({message: "Deleted"});
    } catch (e) {
        res.status(500).json({message: "Internal server error: " + e});
    }
}