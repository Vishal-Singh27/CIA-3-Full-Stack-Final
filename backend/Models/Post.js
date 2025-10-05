import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "User"
        },
        title: {
            type: String,
            required: true,
        }, 
        description: {
            type: String,
            required: true
        },
        picture: String,
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        location: {
            name: String,
            lat: {
                type: Number,
                set: (v) => Math.round(v * 100000) / 100000
            },
            long: {
                type: Number,
                set: (v) => Math.round(v * 100000) / 100000
            }
        }
    }, {
        timestamps: true,
    }
)

const Post = mongoose.model("Post", postSchema);

export default Post;