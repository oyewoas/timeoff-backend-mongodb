const SubjectsModel = require('../models/subjectsModel');

const index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

const createSubjects = async (req, res) => {
    try {
  
      const subject = await SubjectsModel.create(req.body);
  
      res.status(200).json({
        status: 'success',
        data: subject,
      });
    } catch (err) {
      console.log(err);
  
      res.status(500).json({
        status: 'error',
        message: 'An error occured while creating your Subject 😭',
      });
    }
  };
  
const updateSubjects = async (req, res) => {
    try {
      const updateSubject = await SubjectsModel.findOneAndUpdate(
        { subject_code: req.params.subject_code },
        req.body,
        { new: true }
      );
  
      // Check if the writer was found and updated
      if (!updateSubject) {
        res.status(404).json({
          status: 'error',
          message: 'Sorry that Subject does not exist 😭',
        });
      }
  
      res.json({
        status: 'success',
        data: updateSubject,
      });
    } catch (err) {
      console.log(err);
  
      res.status(500).json({
        status: 'error',
        message: 'An error occured while updating the Subject 😭',
      });
    }
  };

  const deleteSubjects = async (req, res) => {
    try {
      const deleteSubjects = await SubjectsModel.findOneAndDelete({
        subject_code: req.params.subject_code,
      });
  
      if (!deleteSubjects) {
        res.status(404).json({
          status: 'error',
          message: 'Sorry you cannot delete a Subjects that does not exist',
        });
        return;
      }
  
      res.json({
        status: 'success',
        message: '👋🏿 successfully deleted Subjects',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: 'An error occured while deleting the Subjects',
      });
    }
  };

  const getaSubjects =  async (req, res) => {
    try {
      const Subjects = await SubjectsModel.findOne({ subject_code: req.params.subject_code });
  
      // Check if a writer was found
      if (!Subjects) {
        res.status(404).json({
          status: 'error',
          message: 'The Subjects was not found',
        });
        return;
      }
  
      res.json({
        status: 'success',
        data: Subjects,
      });
    } catch (err) {
      console.log(err);
  
      res.status(500).json({
        status: 'error',
        message: 'An error occured while getting the Subjects 😭',
      });
    }
  };

  const getAllSubjects = async (req, res) => {
    try {
      const search = req.query.gender ? { gender: req.query.gender } : {};
  
      const Subjectss = await SubjectsModel.find(search);
      res.json({
        status: 'succcess',
        data: Subjectss,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: "An error occured while getting Subjects's",
      });
    }
  };

module.exports = {
    index,
    createSubjects,
    updateSubjects,
    deleteSubjects,
    getaSubjects,
    getAllSubjects
};