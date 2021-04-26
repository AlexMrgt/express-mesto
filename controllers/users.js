const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const AlreadyExistError = require('../errors/AlreadyExistError');
const BadRequestError = require('../errors/BadRequestError');
const AuthenticationError = require('../errors/AuthenticationError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)

    .then((hash) => {
      const {
        email, name, about, avatar,
      } = req.body;
      return User.create({
        email, password: hash, name, about, avatar,
      });
    })
    .then((user) => res.status(201).send({ data: user.toJSON() }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new AlreadyExistError(`${Object.keys(err.keyValue).map((key) => `Пользователь с таким ${key} уже существует`)}`));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'very-strong-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token,
        {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch((err) => {
      next(new AuthenticationError(err.message));
    });
};

const logOut = (req, res, next) => {
  res.clearCookie('jwt')
    .end()
    .catch(next);
};

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => new NotFoundError('Пользователь с таким ID не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Пользователь с таким ID не найден'));
      } else next(err);
    });
};

const editUser = (req, res, next) => {
  const { _id } = req.user;

  const { name, about } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('Пользователь с таким ID не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const editUserAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('Пользователь с таким ID не найден'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  login,
  logOut,
  getUserInfo,
  getUsers,
  getUserById,
  createUser,
  editUser,
  editUserAvatar,
};
