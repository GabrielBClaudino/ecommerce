const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');


router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/users', authController.getAllUsers);
router.get('/user/:id', authController.getUser);

router.delete('/user/:id', authController.deleteUser);
router.put('/user/:id', authController.editUser);

module.exports = router;