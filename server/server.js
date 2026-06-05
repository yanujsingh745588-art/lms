import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import User from './models/User.js'

dotenv.config();
//Intialize Express
const app =express()

//connect to database

//Middlewares
app.use(express.json());
app.use(cors());
connectDB();

//Routes
app.get('/',(req,res)=> res.send("Api working"))

// app.post('/users',async(req,res)=>{
//     try{
//         const user =await User.create(req.body);
//         res.status(201).json(user)
//     } catch(err){
//         res.status(500).json({
//             error: err.message
//         })
//     }
// })
app.post('/clerk',express.json(),clerkWebhooks)
// port 
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})