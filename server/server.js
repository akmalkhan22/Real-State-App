import express from "express";
import authRoute from './routes/authRoute.js'
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173", credentials:true}))

app.get("/", (req, res)=>{
    res.send("Welcome to mern stack")
})
app.use("/api/v1/auth", authRoute)
app.listen(8080, (req, res)=>{
    console.log("Server is running at port 8080")
})

