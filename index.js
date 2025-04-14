import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import verifyJWT from './middleware/auth.js';



let app = express();

mongoose.connect("mongodb+srv://admin:123@cluster0.l5mqf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>{
        console.log("connected to the database");
    }
).catch(
    ()=>{
        console.log("connection failed");
    }
)

//mongodb+srv://admin:123@cluster0.l5mqf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.use(bodyParser.json());
app.use(verifyJWT)





app.use("/api/user",userRouter);
app.use("/api/product",productRouter);





app.listen (5000,()=>{
    console.log("server is running on port 5000");
})