import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.pass}@wandergram.oklftld.mongodb.net/?retryWrites=true&w=majority&appName=Wandergram`)
        console.log("DB connected!")
    }
    catch (e) {
        console.error("Error connecting to DB: ", e);
    }
}

// 