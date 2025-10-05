import User from "../Models/User.js";

export default async function(req, res) {
    try {
        const user = await User.findOne({username: req.params.name});

        if (!user) res.status(404).json({message: "User not found"})
        else res.status(200).json(user);
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}