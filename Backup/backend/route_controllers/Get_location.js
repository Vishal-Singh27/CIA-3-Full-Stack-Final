import Location from "../Models/Location.js";

export default async function (req, res) {
    try {
        const fetched = await Location.findById(req.params.id);
        if (!fetched) return res.status(200).json({message: "Location not found"});
        res.status(201).json(fetched);
    } catch (e) {
        res.status(500).json({message: "Error Fetching: " + e})
    }
}