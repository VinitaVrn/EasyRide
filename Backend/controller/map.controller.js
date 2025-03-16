

import {getAddressCoordinate,getDistanceTime,getAutoCompleteSuggestions,getCaptainsInTheRadius} from "../services/map.service.js";

export const getCoordinates = async (req, res, next) => {
    
    const { address } = req.query;

    try {
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

export const getDistanceTimeApi = async (req, res, next) => {

    try {
        
        const { origin, destination } = req.query;
        console.log(origin,destination)
        const distanceTime = await getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error',err:err.message });
    }
}

export const getAutoSuggestions = async (req, res, next) => {

    try {

        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const { input } = req.query;

        const suggestions = await getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}