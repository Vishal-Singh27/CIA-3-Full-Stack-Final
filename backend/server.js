import { connectDB } from "./db.js"
import express, { Router } from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes.js"

dotenv.config();

const app = express();

// Middleware
app.use(express.json())
app.use(cors())

connectDB().then(() => {
        app.listen(process.env.PORT, () => {
        console.log("Server Started!");
    })
})

// Setting up the router

app.use("/", router)