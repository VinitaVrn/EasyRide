import {Router} from "express";
import { getAutoCompleteSuggestions,getCoordinates,getDistanceTime } from "../controller/map.controller";

const mapRoute=Router();

mapRoute.get("/coordinates",getCoordinates);
mapRoute.get("/getdistancetime",getDistanceTime);
mapRoute.get("/getsuggestion",getAutoCompleteSuggestions)
export {mapRoute};