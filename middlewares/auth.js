const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

module.exports = (req, _, next) => {
  if (!req.cookies.jwt) {
    throw new AuthenticationError('Нужна авторизация');
  }
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new AuthenticationError('Нужна авторизация');
  }

  req.user = payload;
  next();
};
