const UsersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../../env');

const index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

const createUser = async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = await UsersModel.create(req.body);
  
      const response = user.toJSON();

      delete response.password;

      const token = jwt.sign({ id: user.id }, env.secret, { expiresIn: '1h' });
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
  
  const userDashBoard = async function(req, res) {
    try {
      //@ts-ignore
      const user = await UsersModel.findById(req.user);
  
      res.json({ status: 'success', data: user });
    } catch (err) {
      console.log(err);
  
      res.status(401).json({ status: 'error', message: err.message });
    }
  };

  const signinUser = async (req, res) => {
    try {
      const user = await UsersModel.findOne(
        { email: req.body.email },
        '+password'
      );
  
      if (!user)
        return res
          .status(404)
          .json({ status: 'error', message: 'User does not exist' });
  
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
  
      if (!isPasswordValid)
        return res
          .status(401)
          .json({ status: 'error', message: 'Invalid password' });
  
      const token = jwt.sign({ id: user.id }, env.secret);
      res.json({status: 'success', data: { token }});
    } catch (err) {
      res.status(500).json({ status: 'error', message: 'An error occured' });
    }
  };


module.exports = {
    index,
    createUser,
    signinUser,
    userDashBoard,
};