const usersRouter = require('express').Router();
const { createUser, getUsers, getUserById, editUser, editUserAvatar  } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', editUser);
usersRouter.patch('/me/avatar', editUserAvatar);

module.exports = usersRouter;