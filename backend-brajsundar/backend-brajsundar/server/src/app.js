import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.routes.js";


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

app.use("/api", routes)

app.get("/", (_req, res) => {
    return res.send(
        "Hey there API here"
    )
})

app.all("*", (_req, res) => {
    return res.status(400).json({
        success: false,
        message: "Route not found"
    })
})

export default app;