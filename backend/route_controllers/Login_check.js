import User from "../Models/User.js";
import bcrypt from "bcrypt"

export default async function (req, res) {
    try {
        // Real data
        const user = await User.findOne({username: req.body.username});
        if (!user) return res.status(201).json({message: "User not found"});

        const password = req.body.password;

        const hashed_pass = await bcrypt.hash(password, user.password_salt);
        if (hashed_pass == user.password) return res.status(201).json({message: "Login successfull!"});
        return res.status(201).json({message: "Wrong password!"});
    }
    catch (e) {
        res.status(500).json({message: "Internal error " + e});
    }
}