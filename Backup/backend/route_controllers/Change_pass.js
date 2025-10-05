import bcrypt from "bcrypt";
import User from "../Models/User";

export default async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let pass_salt = await bcrypt.genSalt();
    let new_hash_pass = bcrypt.hash(password, pass_salt);

    // Fetching the user to change password of
    let user = await User.findOne({username: username});
    if (!user) return req.status(404).json({message: "User not found"});

    let new_user = await User.findByIdAndUpdate(user._id, {password: new_hash_pass, password_salt: pass_salt}, {new: true});

    res.status(201).json({"message": "Data updated", "data": new_user})
}