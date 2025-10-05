import Location from "../Models/Location.js";

export default async function (req, res) {
    try {
        let locations = await Location.find();
        if (!locations) return res.status(200).json({message: "No locations in the database!"});
        res.status(201).json(locations);
    } catch (e) {
        res.status(500).json({message: "Internal server error: " + e});
    }
}