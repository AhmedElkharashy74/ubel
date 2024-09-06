const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/authorize');

// User registration
router.post('/register', UserController.create);

// User login
router.post('/login', UserController.login);

// Get all users with pagination and filtering
router.get('/', authenticate, authorize(['admin']), UserController.findAll);

// Update a user by ID
router.put('/:id', authenticate, authorize(['admin', 'user']), UserController.update);

// Delete a user by ID
router.delete('/:id', authenticate, authorize(['admin']), UserController.delete);

module.exports = router;
