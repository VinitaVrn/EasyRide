import {Router} from "express";
import { authenticate_user } from "../middlewares/auth.middlewares.js";

import { registerCaptain,loginCaptain,getCaptainProfile } from "../controller/captian.controller.js";

const captianRouter=Router();

captianRouter.post("/register",registerCaptain);
captianRouter.post("/login",loginCaptain);
captianRouter.get("/get",authenticate_user,getCaptainProfile);

export{captianRouter}