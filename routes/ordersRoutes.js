const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');
const { isAuthenticated } = require('../middlewares/authenticate')

router.get('/', isAuthenticated, orderController.getAllOrders);
router.get('/:order_id', isAuthenticated, orderController.getOrderById);
router.post('/', isAuthenticated, orderController.createOrder);
router.put('/:order_id', isAuthenticated, orderController.updateOrder);
router.delete('/:order_id', isAuthenticated, orderController.deleteOrder);

module.exports = router;
