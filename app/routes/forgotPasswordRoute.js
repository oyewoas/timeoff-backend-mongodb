const express = require('express');
const router = express.Router();
const ForgotController = require('../controllers/forgotPasswordController');

//subjects Routes
router.post('/forgotpassword', ForgotController.forgotPassword);


module.exports = router;