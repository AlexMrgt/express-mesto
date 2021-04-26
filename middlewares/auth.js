const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, _, next) => {
  if (!req.cookies.jwt) {
    throw new AuthenticationError('Нужна авторизация');
  }
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'very-strong-secret');
  } catch (err) {
    throw new AuthenticationError('Нужна авторизация');
  }

  req.user = payload;
  next();
};
