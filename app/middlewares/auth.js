const jwt = require('jsonwebtoken');

const SECRET = 'AWESOMETIMEOFF';

/**
 * Auth middleware that checks if an authorization header exists in the request and if the token contained within is valid
 */
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).json({
        status: 'error',
        message: 'Please specify an authorization header',
      });

    const token = authHeader.split(' ')[1];

    const tokenData = jwt.verify(token, SECRET);

    req.user = tokenData.id;

    next();
  } catch (err) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not authorized!',
    });
  }
};