import { Router } from "express";
import { createRide,getFare,startRide,confirmRide,endRide } from "../controller/ride.controller.js";
import { authenticate_user,authenticate_captain } from "../middlewares/auth.middlewares";

const rideRouter=Router()

rideRouter.post("/create",authenticate_user,createRide);
rideRouter.get('/get-fare',authenticate_user,getFare)

rideRouter.post('/confirm',
    authenticate_captain,
    confirmRide
)

rideRouter.get('/start-ride',
    authenticate_captain,
    startRide
)

rideRouter.post('/end-ride',
    authenticate_captain,
    endRide
)

export {rideRouter}

