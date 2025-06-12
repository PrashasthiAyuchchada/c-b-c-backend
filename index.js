import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import verifyJWT from './middleware/auth.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
    ()=>{
        console.log("connected to the database");
    }
).catch(
    ()=>{
        console.log("connection failed");
    }
)



app.use(bodyParser.json());
app.use(verifyJWT)





app.use("/api/user",userRouter);
app.use("/api/product",productRouter);





app.listen (5000,()=>{
    console.log("server is running on port 5000");
})