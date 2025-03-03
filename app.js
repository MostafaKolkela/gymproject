const express = require('express')
const app = express()
app.use(express.json())
const dotenv = require('dotenv')
dotenv.config({path: './config/.env'})
const mongoose = require('mongoose')
const cors = require('cors')

const uri = process.env.MONGO_URL

mongoose.connect(uri).then(()=>{
    console.log('db connected')
})

app.use(cors())

const userRoute = require('./auth/userAuth/route/userAuthRoute')
app.use('/auth',userRoute)


app.listen(process.env.PORT || 3000,()=>{
    console.log(`listening on port: ${process.env.PORT}`)
})