import { configDotenv } from "dotenv";
configDotenv();
import { captain } from "../models/captian.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const registerCaptain = async (req, res) => {

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    
    const { name, email, password, vehicle } = req.body;
    if(!name||!email||!password||!vehicle){
        throw new Error("all feilds required");
    }
    try{
    const isCaptainAlreadyExist = await captain.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }
    
    const hashedPassword = await argon2.hash(password)

    const newcaptain = {
        name:name,
        email,
        password: hashedPassword,
        vehicle:{
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
        }
    };
    await captain.create(newcaptain)
    const captaindetail = await captain.findOne({ email })
    const token = jwt.sign({id:captaindetail._id},process.env.JWT_KEY,{expiresIn:"2days"})
    res.status(201).json({newcaptain,token});
    } catch(e){
        res.status(500).json({msg:"Internal server error",error:e.message})
    }

}

export const loginCaptain = async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const { email, password } = req.body;
    try{
    const Captain = await captain.findOne({ email }).select('+password');

    if (!Captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await argon2.verify(Captain.password,password)
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({id:Captain._id,name:Captain.name},process.env.JWT_KEY,{expiresIn:"24h"})

    res.status(200).json({ Captain,token});
    }catch(e){
        res.status(500).json({msg:"Internal server error",error:e.message})
    }
}

export const getCaptainProfile = async (req, res) => {
    try{
        res.status(200).json(req.captain);
    }catch(err){
        res.status(500).json({msg:"Internal server error"})
    }
}

export const logoutCaptain = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
}