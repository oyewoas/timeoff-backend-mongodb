const UsersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

const createUser = async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = await UsersModel.create(req.body);
  
      const response = writer.toJSON();

      delete response.password;

      const token = jwt.sign({ id: writer.id }, SECRET, { expiresIn: '1h' });
      res.status(200).json({
        status: 'success',
        data: { user: response, token },
      });
    } catch (err) {
      console.log(err);
  
      res.status(500).json({
        status: 'error',
        message: 'An error occured while creating your User 😭',
      });
    }
  };
  


module.exports = {
    index,
    createUser,
};