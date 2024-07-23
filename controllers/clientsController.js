const Client = require('../models/clients');

// GET all clients
const getAllClients = async (req, res) => {
    //#swagger.tags=['Clients']    

    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single client by CPF
const getClientByCPF = async (req, res) => {
    //#swagger.tags=['Clients']    

    try {
        const client = await Client.findOne({ client_cpf: req.params.client_cpf });
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new client
const createClient = async (req, res) => {
    //#swagger.tags=['Clients']    
    const client = new Client(req.body);
    try {
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT update client by CPF
const updateClient = async (req, res) => {
    //#swagger.tags=['Clients']    
    try {
        const client = await Client.findOneAndUpdate({ client_cpf: req.params.client_cpf }, req.body, { new: true });
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE client by CPF
const deleteClient = async (req, res) => {
    //#swagger.tags=['Clients']    
    try {
        const client = await Client.findOneAndDelete({ client_cpf: req.params.client_cpf });
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json({ message: 'Client deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllClients,
    getClientByCPF,
    createClient,
    updateClient,
    deleteClient
}