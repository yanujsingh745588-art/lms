import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import User from './models/User.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'

dotenv.config();
//Intialize Express
const app =express()

//Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())

//connect to database
connectDB();
await connectCloudinary()

//Routes
app.get('/',(req,res)=> res.send("Api working"))
app.post('/clerk',express.json(),clerkWebhooks)
app.use('/api/educator',express.json(),educatorRouter)
app.use('/api/course',express.json(), courseRouter)
app.use('/api/user',express.json(),userRouter)
app.post('/stripe',express.raw({type: 'application/json'}),stripeWebhooks)
// port 
const PORT = process.env.PORT || 5000


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})