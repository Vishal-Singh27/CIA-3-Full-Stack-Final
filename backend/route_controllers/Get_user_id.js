import User from "../Models/User.js";

export default async function (req, res) {
    try {
        let user = await User.findOne({username: req.body.username});
        if (!user) return res.status(200).json({message: "User not found!"});
        res.status(200).json({message: "User found!", id: user._id});
    } catch (e) {
        res.status(500).json({message: "Internal Server Error: " + e});
    }
}