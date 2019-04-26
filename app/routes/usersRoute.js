const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');

//subjects Routes
router.get('/', UsersController.index)
// router.post('/signin', UsersController.createSubjects);
router.post('/user/signup', UsersController.createUser);

module.exports = router;