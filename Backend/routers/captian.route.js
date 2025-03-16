import {Router} from "express";
import { authenticate_user,authenticate_captain } from "../middlewares/auth.middlewares.js";

import { registerCaptain,loginCaptain,getCaptainProfile,logoutCaptain } from "../controller/captian.controller.js";

const captianRouter=Router();

captianRouter.post("/register",registerCaptain);
captianRouter.post("/login",loginCaptain);
captianRouter.get("/profile",authenticate_captain,getCaptainProfile);
captianRouter.delete("/delete",authenticate_captain,logoutCaptain)

export{captianRouter}