const Order = require('../models/orders');

// GET all orders
exports.getAllOrders = async (req, res) => {
    //#swagger.tags=['Orders']    
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single order by ID
exports.getOrderById = async (req, res) => {
    //#swagger.tags=['Orders']    
    try {
        const order = await Order.findById(req.params.order_id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new order
exports.createOrder = async (req, res) => {
    //#swagger.tags=['Orders']    
    const order = new Order(req.body);
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT update order by ID
exports.updateOrder = async (req, res) => {
    //#swagger.tags=['Orders']    
    try {
        const order = await Order.findByIdAndUpdate(req.params.order_id, req.body, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE order by ID
exports.deleteOrder = async (req, res) => {
    //#swagger.tags=['Orders']    
    try {
        const order = await Order.findByIdAndDelete(req.params.order_id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
