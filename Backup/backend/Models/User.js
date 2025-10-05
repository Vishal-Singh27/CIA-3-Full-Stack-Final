import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    password: {
        type: String,
        required: true
    },
    password_salt: {
        type: String,
        required: true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ], 
    
    followers: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }], 
    
    following: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    
    }
    , {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;
