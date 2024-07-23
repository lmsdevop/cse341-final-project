const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { isAuthenticated } = require('../middlewares/authenticate')

router.get('/', userController.getAllUsers);
router.get('/:user_id', userController.getUserById);
router.post('/', isAuthenticated, userController.createUser);
router.put('/:user_id', isAuthenticated, userController.updateUser);
router.delete('/:user_id', isAuthenticated, userController.deleteUser);

module.exports = router;
