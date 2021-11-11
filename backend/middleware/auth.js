const jwt = require('jsonwebtoken');
const config = require('config');
const responsBuilder = require('../utils/responseBuilder');
const responseBuilder = require('../utils/responseBuilder');

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return responsBuilder(res, 401, { msg: 'No authentication token, access denied' });
    const verified = jwt.verify(token, config.get('Efficionado.jwtSecret'));
    if (!verified) return responseBuilder(res, 401, { msg: 'Token verification failed, authorization denied' });

    req.user = verified.id;
    return next();
  } catch (err) {
    return responseBuilder(res, 500, { error: err.message });
  }
};

module.exports = auth;
