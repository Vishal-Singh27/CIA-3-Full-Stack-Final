import Location from "../Models/Location.js";

export default async function (req, res) {
    try {
        let newLocation = new Location(req.body);
        await newLocation.save();
        res.status(201).json(newLocation);
    }
    catch (e) {
        res.status(500).json({message: `Internal Server Error: ${e}`})
    }
}