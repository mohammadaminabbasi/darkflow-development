const jwt = require('jsonwebtoken');
const { keys } = require('../../../web-config')

const currentUser = (req, res, next) => {
    
    if (!req.cookies.jwt) {
      return next();
    }

    try {
      const payload = jwt.verify(
        req.cookies.jwt,
        keys.JWT_KEY
      );

      req.currentUser = payload;
    } catch (err) {
      console.log(err)
    }

    next();
};

module.exports = currentUser