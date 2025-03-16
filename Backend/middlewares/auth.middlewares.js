import { configDotenv } from "dotenv";
configDotenv();
import jwt from "jsonwebtoken"
import { users } from "../models/user.model.js";
import { captain } from "../models/captian.model.js";
import { blacklist } from "../models/blacklist.model.js";

export const authenticate_user=async (req,res,next)=>{
    const token=req.headers["authorization"].split(" ")[1];
   
    if(!token){
        return res.status(401).json({msg:"Unauthorized"})
    }
    try {
            const isblacklisted=await blacklist.findOne({token:token})
            if(isblacklisted){
                console.log("hi")
                return res.status(401).json({msg:"unauthorized"})
            }
            const decoded = jwt.verify(token,process.env.JWT_KEY);
                const user = await users.findById(decoded.id)
                req.user = user;
            return next();
    
        } catch (err) {
            console.log(err)
            return res.status(401).json({ message: 'Unauthorized' ,err:err.msg});
        }
}

export const authenticate_captain=async(req,res,next)=>{
    const token=req.headers["authorization"].split(" ")[1];
    if(!token){
        return res.status(401).json({msg:"Unauthorized"})
    }try{
            const isblacklisted=await blacklist.findOne({token:token})
            if(isblacklisted){
                return res.status(401).json({msg:"unauthorized"})
            }
            const decoded = jwt.verify(token,process.env.JWT_KEY);
            const Captain = await captain.findById(decoded.id)
            req.captain=Captain;
            return next();
    }catch(err){
            console.log(err)
            return res.status(401).json({ message: 'Unauthorized' ,err:err.msg});
    }
}