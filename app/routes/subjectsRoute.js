const express = require('express');
const router = express.Router();
const SubjectsController = require('../controllers/subjectsController');

//subjects Routes
router.post('/subjects/add', SubjectsController.createSubjects);
router.put('/subjects/update/:subject_code', SubjectsController.updateSubjects);
router.delete('/subjects/delete/:subject_code', SubjectsController.deleteSubjects);
router.get('/subjects/get/:subject_code', SubjectsController.getaSubjects);
router.get('/subjects', SubjectsController.getAllSubjects);



// router.put('/', SubjectsController.create_subjects);
// router.delete('/', SubjectsController.create_subjects);






module.exports = router;