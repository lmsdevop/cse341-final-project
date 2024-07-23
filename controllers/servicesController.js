const Service = require('../models/services');

// GET all services
exports.getAllServices = async (req, res) => {
    //#swagger.tags=['Services']    
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single service by ID
exports.getServiceById = async (req, res) => {
    //#swagger.tags=['Services']    
    try {
        const service = await Service.findOne({ service_code: req.params.service_code });
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new service
exports.createService = async (req, res) => {
    //#swagger.tags=['Services']    
    const service = new Service(req.body);
    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT update service by ID
exports.updateService = async (req, res) => {
    //#swagger.tags=['Services']    
    try {
        const service = await Service.findOneAndUpdate({ service_code: req.params.service_code }, req.body, { new: true });
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE service by ID
exports.deleteService = async (req, res) => {
    //#swagger.tags=['Services']    
    try {
        const service = await Service.findOneAndDelete({ service_code: req.params.service_code });
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
