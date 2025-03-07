import express from "express";
import http  from "http";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();
import {connect} from "mongoose";

const app=express();
app.use(cors());
app.use(express.json());

const server=http.createServer(app);

server.listen(process.env.port,async()=>{
    try{
        await connect(process.env.mongodb)
        console.log("db connected");
        console.log("server started on port http://localhost:4444")
    }catch(e){
        console.log(e.message)
    }
})