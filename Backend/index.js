import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import http  from "http";
import cors from "cors";
import {connect} from "mongoose";
import { userRouter } from "./routers/users.routes.js";
import { captianRouter } from "./routers/captian.route.js";

const app=express();
app.use(cors());
app.use(express.json());

app.use("/user",userRouter);
app.use("/captain",captianRouter);

const server=http.createServer(app);

server.listen(process.env.PORT,async()=>{
    try{
        await connect(process.env.MONGO_URL)
        console.log("db connected");
        console.log("server started on port http://localhost:4444")
    }catch(e){
        console.log(e.message)
    }
})