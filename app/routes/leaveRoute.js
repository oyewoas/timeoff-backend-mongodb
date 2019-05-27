const express = require('express');
const router = express.Router();
const LeaveController = require('../controllers/leaveController');
const AuthMiddleware = require('../middlewares/auth');

//subjects Routes
router.post('/user/leave', AuthMiddleware, LeaveController.createLeave);
router.get('/user/leave', AuthMiddleware, LeaveController.getAllUserLeave);
router.get('/user/leave/edit/:leaveId', AuthMiddleware, LeaveController.editLeave);
router.put('/user/leave/update/:leaveId', AuthMiddleware, LeaveController.updateLeave);
router.get('/user/leave/delete/:leaveId', LeaveController.deleteLeave);




module.exports = router;
