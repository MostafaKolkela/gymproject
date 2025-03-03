require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const uri = process.env.MONGO_URL

mongoose.connect(uri).then(()=>{
    console.log('db connected')
})

app.use(cors())

app.listen(process.env.PORT || 3000,()=>{
    console.log('listening on port: 3000')
})