const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientsController');
const { isAuthenticated } = require('../middlewares/authenticate')


router.get('/', clientController.getAllClients);
router.get('/:client_cpf', clientController.getClientByCPF);
router.post('/', isAuthenticated, clientController.createClient);
router.put('/:client_cpf', isAuthenticated, clientController.updateClient);
router.delete('/:client_cpf', isAuthenticated, clientController.deleteClient);

module.exports = router;
