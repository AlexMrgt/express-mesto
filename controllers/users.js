const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => res.status(404).send({ message: 'Пользователь не найден' }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Пользователь не найден' });
      }
      return res.status(400);
    })
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      }
      return err;
    })
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const editUser = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(404).send({ message: 'Нет пользователя с таким ID' });
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный формат данных для записи' });
      }

      return res.status(400);
    })
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const editUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(404).send({ message: 'Нет пользователя с таким ID' });
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      }
      return res.status(400);
    })
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  editUser,
  editUserAvatar,
};
