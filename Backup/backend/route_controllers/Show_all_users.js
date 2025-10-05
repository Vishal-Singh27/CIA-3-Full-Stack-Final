import User from "../Models/User.js"

export default async function (req, res) {
    try {
        let users = await User.find();
        if (User.length == 0) return res.status(200).json({message: "No users in the database!"});
        res.status(201).json(users);
    } catch (e) {
        res.status(500).json({message: "Internal server error: " + e});
    }
}