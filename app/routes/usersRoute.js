const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');
const AuthMiddleware = require('../middlewares/auth');

//subjects Routes
router.get('/', UsersController.index)
router.post('/user/signin', UsersController.signinUser);
router.post('/user/signup', UsersController.createUser);
router.get('/user/dashboard', AuthMiddleware, UsersController.userDashBoard);


module.exports = router;