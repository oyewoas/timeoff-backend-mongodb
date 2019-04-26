const express = require('express');
const router = express.Router();
const TeachersController = require('../controllers/teachersController');

//Teacher Routes
router.post('/teacher/signup', TeachersController.createTeacher);
router.put('/teacher/update/:username', TeachersController.updateTeacher);
router.delete('/teacher/delete/:username', TeachersController.deleteTeacher);
router.get('/teacher/get/:username', TeachersController.getaTeacher);
router.get('/teachers', TeachersController.getAllTeachers);



// router.put('/', TeachersController.create_teacher);
// router.delete('/', TeachersController.create_teacher);






module.exports = router;