const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehiclesController');
const { isAuthenticated } = require('../middlewares/authenticate')

router.get('/', isAuthenticated, vehicleController.getAllVehicles);
router.get('/:vehicle_sign', isAuthenticated, vehicleController.getVehicleBySign);
router.post('/', isAuthenticated, vehicleController.createVehicle);
router.put('/:vehicle_sign', isAuthenticated, vehicleController.updateVehicle);
router.delete('/:vehicle_sign', isAuthenticated, vehicleController.deleteVehicle);

module.exports = router;
