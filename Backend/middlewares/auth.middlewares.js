import { configDotenv } from "dotenv";
configDotenv();
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import { users } from "../models/user.model.js";
import { captain } from "../models/captian.model.js";

export const authenticate_user=async (req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(401).json({msg:"Unauthorized"})
    }
    try {
            const decoded = jwt.verify(token,process.env.secretkey);
            if(req.originalUrl.startsWith("/captain")){
                console.log("hi")
                const Captain = await captain.findById(decoded.id)
                req.captain=Captain;
            }else{
                const user = await users.findById(decoded.id)
                req.user = user;
            }
            return next();
    
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' ,err:err.msg});
        }
}