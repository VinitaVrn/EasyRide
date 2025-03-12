import {Router} from "express";
import { getAutoCompleteSuggestions,getCoordinates,getDistanceTime } from "../controller/map.controller.js";
import { authenticate_user } from "../middlewares/auth.middlewares.js";

const mapRoute=Router();

mapRoute.get("/coordinates",authenticate_user,getCoordinates);
mapRoute.get("/getdistancetime",authenticate_user,getDistanceTime);
mapRoute.get("/getsuggestion",authenticate_user,getAutoCompleteSuggestions)
export {mapRoute};