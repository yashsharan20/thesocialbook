import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import quizRoute from "./routes/quiz.route.js"
import userchoiceRoute from "./routes/userchoice.route.js"
import path from "path"
dotenv.config({})

const app = express()

const _dirname = path.resolve();

app.get("/home",(req,res)=>{
    return res.status(200).json({
        message:"i am coming from backend",
        success:"true"
    })
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions = {
    origin:'https://thesocialbook.onrender.com',
    credentials:true
}
app.use(cors(corsOptions))


app.use("/api/v1/user",userRoute)
app.use("/api/v1/quiz",quizRoute)
app.use('/api/v1/userchoice', userchoiceRoute);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    connectDB() 
    console.log(`Server running at port ${PORT}`)
})