import {Router} from "express";
import { registerUser,loginUser,getprofile,deleteuser } from "../controller/user.control.js";
import { authenticate_user } from "../middlewares/auth.middlewares.js";

const userRouter=Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/profile",authenticate_user,getprofile)
userRouter.get("/delete",authenticate_user,deleteuser)

export{userRouter}
