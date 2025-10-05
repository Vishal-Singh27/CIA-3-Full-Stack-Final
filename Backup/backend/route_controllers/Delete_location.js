import Location from "../Models/Location.js";

export default async function (req, res) {
    try {
        const fetched = await Location.findByIdAndDelete(req.params.id);
        if (!fetched) return res.status(200).json({message: "Location not found"});
        res.status(201).json({message: "Location deleted"});
    } catch (e) {
        res.status(500).json({message: "Error Deleting: " + e})
    }
}