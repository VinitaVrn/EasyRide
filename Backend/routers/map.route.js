import {Router} from "express";
import { getAutoSuggestions,getCoordinates,getDistanceTimeApi } from "../controller/map.controller.js";
import { authenticate_user } from "../middlewares/auth.middlewares.js";

const mapRoute=Router();

mapRoute.get("/coordinates",authenticate_user,getCoordinates);
mapRoute.get("/getdistancetime",getDistanceTimeApi);
mapRoute.get("/getsuggestion",authenticate_user,getAutoSuggestions)
export {mapRoute};
