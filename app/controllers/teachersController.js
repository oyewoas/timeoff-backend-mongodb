const TeachersModel = require('../models/teachersModel');
const bcrypt = require('bcrypt');


const index = function(req, res) {
    res.send('Site Home Page');
};

const createTeacher = async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
  
      const teacher = await TeachersModel.create(req.body);
  
      res.status(200).json({
        status: 'success',
        data: teacher,
      });
    } catch (err) {
      console.log(err);
  
      res.status(500).json({
        status: 'error',
        message: 'An error occured while creating your account 😭',
      });
    }
  };
  
const updateTeacher = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      const updateTeacher = await TeachersModel.findOneAndUpdate(
        { username: req.params.username },
        req.body,
        { new: true }
      );
  
      // Check if the writer was found and updated
      if (!updateTeacher) {
        res.status(404).json({
          status: 'error',
          message: 'Sorry that Teacher does not exist 😭',
        });
      }
  
      res.json({
        status: 'success',
        data: updateTeacher,
      });
    } catch (err) {
      console.log(err);
  
      res.status(500).json({
        status: 'error',
        message: 'An error occured while updating the Teacher 😭',
      });
    }
  };

  const deleteTeacher = async (req, res) => {
    try {
      const deleteTeacher = await TeachersModel.findOneAndDelete({
        username: req.params.username,
      });
  
      if (!deleteTeacher) {
        res.status(404).json({
          status: 'error',
          message: 'Sorry you cannot delete a Teacher that does not exist',
        });
        return;
      }
  
      res.json({
        status: 'success',
        message: '👋🏿 successfully deleted Teacher',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: 'An error occured while deleting the Teacher',
      });
    }
  }

  const getaTeacher =  async (req, res) => {
    try {
      const teacher = await TeachersModel.findOne({ username: req.params.username });
  
      // Check if a writer was found
      if (!teacher) {
        res.status(404).json({
          status: 'error',
          message: 'The Teacher was not found',
        });
        return;
      }
  
      res.json({
        status: 'success',
        data: teacher,
      });
    } catch (err) {
      console.log(err);
  
      res.status(500).json({
        status: 'error',
        message: 'An error occured while getting the Teacher 😭',
      });
    }
  };

  const getAllTeachers = async (req, res) => {
    try {
      const search = req.query.gender ? { gender: req.query.gender } : {};
  
      const teachers = await TeachersModel.find(search);
      res.json({
        status: 'succcess',
        data: teachers,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: "An error occured while getting teacher's",
      });
    }
  };

module.exports = {
    index,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getaTeacher,
    getAllTeachers
};