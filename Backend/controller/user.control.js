import { users } from "../models/user.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv()

export const registerUser = async (req, res, next) => {

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const { username, email, password } = req.body;
    try{
        const isUserAlready = await users.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist login in' });
    }

    const hashedPassword = await argon2.hash(password)

    const user = await userService.createUser({
        username:username,
        email:email,
        password: hashedPassword
    });
    res.status(200).json({msg:"Signup success"})

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
    try{
    const user = await users.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await argon2.verify(password,user.password)

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({id:user._id},process.env.secretkey,{expiresIn:"24h"})

    // res.cookie('token', token);

    res.status(200).json({msg:"login success", token:token});
}catch(e){
    res.status(500).json({msg:"Internal server error",error:e.message})
}
}


