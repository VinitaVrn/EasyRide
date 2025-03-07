import argon2 from "argon2"
import jwt from "jsonwebtoken"
import { users } from "../models/user.model.js";

export const authenticate_user=async (req,res,next)=>{
    const token=req.headers["authentication"].split(" ")[1];
    if(!token){
        return res.status(401).json({msg:"Unauthorized"})
    }
    try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await users.findById(decoded.id)
    
            req.user = user;
    
            return next();
    
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' ,err:err.msg});
        }
}