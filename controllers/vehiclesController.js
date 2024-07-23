const Vehicle = require('../models/vehicles');

// GET all vehicles
exports.getAllVehicles = async (req, res) => {
    //#swagger.tags=['Vehicles']    
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single vehicle by sign
exports.getVehicleBySign = async (req, res) => {
    //#swagger.tags=['Vehicles']    
    try {
        const vehicle = await Vehicle.findOne({ vehicle_sign: req.params.vehicle_sign });
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new vehicle
exports.createVehicle = async (req, res) => {
    //#swagger.tags=['Vehicles']    
    const vehicle = new Vehicle(req.body);
    try {
        const newVehicle = await vehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT update vehicle by sign
exports.updateVehicle = async (req, res) => {
    //#swagger.tags=['Vehicles']    
    try {
        const vehicle = await Vehicle.findOneAndUpdate({ vehicle_sign: req.params.vehicle_sign }, req.body, { new: true });
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE vehicle by sign
exports.deleteVehicle = async (req, res) => {
    //#swagger.tags=['Vehicles']    
    try {
        const vehicle = await Vehicle.findOneAndDelete({ vehicle_sign: req.params.vehicle_sign });
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json({ message: 'Vehicle deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
