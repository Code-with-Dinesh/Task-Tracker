const express = require('express')
const app = express()
const dotenv = require("dotenv")
const userRoute = require("./routes/UserRoute")
const cors = require('cors')
dotenv.config()
const Dbconnection = require('./connection/Dbconnection')

Dbconnection()
app.listen(process.env.PORT,()=>{
    console.log("Server running on Port number ",process.env.PORT)
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', userRoute);


app.get('/',(req,res)=>{
    res.send("Home Route")
})