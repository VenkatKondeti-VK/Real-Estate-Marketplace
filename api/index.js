import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import listingRouter from './routes/listingRoute.js'
import cookieParser from 'cookie-parser'

import dotenv from 'dotenv'
dotenv.config()


// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(err);
})


// Using EXPRESS as APP
const app = express()
// Allowing JSON as INPUT to SERVER
app.use(express.json())
// Allowing app to use cookie-parser
app.use(cookieParser())


// API ROUTES
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)

// MIDDLEWARE for ANY ERROR
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


 

// APP LISTEN PORT
app.listen(8080, function(){
    console.log("Server running on port 8080");
})