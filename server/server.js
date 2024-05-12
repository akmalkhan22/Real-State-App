import express from "express";
import authRoute from './routes/authRoute.js'

const app = express()
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Welcome to mern stack")
})
app.use("/api/v1/auth", authRoute)
app.listen(8080, (req, res)=>{
    console.log("Server is running at port 8080")
})

