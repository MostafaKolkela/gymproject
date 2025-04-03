import express from 'express';
const app = express()
app.use(express.json())
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})
import mongoose from 'mongoose'
import cors from 'cors'
import {generatePlan} from './aiPot/potController.js'

const uri = process.env.MONGO_URL

mongoose.connect(uri).then(()=>{
    console.log('db connected')
})

app.use(cors())

import * as userRoute from './auth/userAuth/route/userAuthRoute.js'
app.use('/auth',userRoute.default)

import * as coachRoute from './auth/coachAuth/Route/coachRoute.js'
app.use('/coachauth',coachRoute.default)

app.post('/generate-plan', async (req, res) => {
  const userData = req.body;
  
  // التحقق من المدخلات
  if (!userData.age || !userData.weight || !userData.height || !userData.goal || !userData.workout_days) {
    return res.status(400).json({ error: "يجب إدخال جميع البيانات المطلوبة" });
  }

  const plan = await generatePlan(userData);
  
  if (plan) {
    res.json(plan);
  } else {
    res.status(500).json({ error: "❌ فشل إنشاء الخطة" });
  }
});


app.listen(process.env.PORT || 3000,()=>{
    console.log(`listening on port: ${process.env.PORT}`)
})