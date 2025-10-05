import User from "../Models/User.js";
import bcrypt from "bcrypt"

export default async function (req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const salt = await bcrypt.genSalt();
        const hashed_pass = await bcrypt.hash(password, salt);
        const newUser = new User({username: username, password: hashed_pass, password_salt: salt});
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (e) {
        if (e.code == 11000)
            res.status(500).json({message: "Username already exists"});

        else if (e.name == "ValidationError")
            res.status(400).json({message: e.message})

        else
            res.status(500).json({message: "Data couldnt be added"});
    }
}