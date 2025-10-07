const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users
router.get('/', userController.listUsers);

// GET /api/users/:id
router.get('/:id', userController.getUser);

module.exports = router;
