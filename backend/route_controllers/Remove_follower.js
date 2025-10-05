import User from "../Models/User.js";

export default async function (req, res) {
    try {
        // Linking the post to the user
        const user = await User.findOne({username: req.body.username});
        const user2 = await User.findOne({username: req.params.usernameToUnFollow});
        await User.findByIdAndUpdate(user._id, {$pull: {following: user2._id}});
        await User.findByIdAndUpdate(user2._id, {$pull: {followers: user._id}});
        res.status(201).json({message: "Successful"});
    } catch (e) {
        if (e.name == "ValidationError"){
            console.log(e.message);
            res.status(400).json({message: e.message});
        }

        else
            res.status(500).json({message: "Data couldnt be added"});
    }
}