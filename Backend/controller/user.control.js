import { users } from "../models/user.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv()
import { blacklist } from "../models/blacklist.model.js";

export const registerUser = async (req, res, next) => {

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const { fullname, email, password } = req.body;
    if(!fullname||!email||!password){
        throw new Error("all feilds required")
    }
    try{
        const isUserAlready = await users.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist login in' });
    }
        const hashedPassword = await argon2.hash(password)

        const user =  {
            fullname,
            email,
            password:hashedPassword
        }; 
          
    await users.create(user);
    const userdetail = await users.findOne({ email })
    const token = jwt.sign({id:userdetail._id},process.env.JWT_KEY,{expiresIn:"24h"})
    res.status(201).json({msg:"Signup success",token})

}catch(e){
    res.status(500).json({msg:"Internal server error", error:e.message})
}
}

export const loginUser = async (req, res, next) => {

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const { email, password } = req.body;
    if(!email||!password){
        throw new Error("all feilds required")
    }
    try{
    const user = await users.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const isMatch = await argon2.verify(user.password,password)
    console.log("hi")
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn:"24h"})

    // res.cookie('token', token);

    res.status(200).json({msg:"login success", token:token});
}catch(e){
    res.status(500).json({msg:"Internal server error",error:e.message})
}
}

export const getprofile =async(req,res)=>{
    res.status(200).json(req.user);
}

export const deleteuser=async(req,res)=>{
    const token = req.headers.authorization.split(' ')[ 1 ];

    await blacklist.create({ token });

    res.status(200).json({ message: 'Logged out' });
}


