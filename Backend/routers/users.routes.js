import {Router} from "express";
import { registerUser,loginUser } from "../controller/user.control.js";

const userRouter=Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)

export{userRouter}
