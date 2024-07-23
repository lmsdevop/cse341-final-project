const User = require('../models/users');

// GET all users
exports.getAllUsers = async (req, res) => {
    //#swagger.tags=['Users']    
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single user by ID
exports.getUserById = async (req, res) => {
    //#swagger.tags=['Users']    
    try {
        const user = await User.findById(req.params.user_id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new user
exports.createUser = async (req, res) => {
    //#swagger.tags=['Users']    
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT update user by ID
exports.updateUser = async (req, res) => {
    //#swagger.tags=['Users']    
    try {
        const user = await User.findByIdAndUpdate(req.params.user_id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE user by ID
exports.deleteUser = async (req, res) => {
    //#swagger.tags=['Users']    
    try {
        const user = await User.findByIdAndDelete(req.params.user_id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
