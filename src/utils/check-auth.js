const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');
const { ERROR_MSG } = require('utils/constants');

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);

        return user;
      } catch (err) {
        throw new AuthenticationError(ERROR_MSG.AUTH.INVALID_TOKEN);
      }
    }

    throw new Error(ERROR_MSG.AUTH.MUST_BE.BEARER);
  }
  throw new Error(ERROR_MSG.AUTH.MUST_BE.PROVIDED);
};
