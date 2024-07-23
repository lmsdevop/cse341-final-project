const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/servicesController');
const { isAuthenticated } = require('../middlewares/authenticate')

router.get('/', serviceController.getAllServices);
router.get('/:service_code', serviceController.getServiceById);
router.post('/', isAuthenticated, serviceController.createService);
router.put('/:service_code', isAuthenticated, serviceController.updateService);
router.delete('/:service_code', isAuthenticated, serviceController.deleteService);

module.exports = router;
