const usersRouter = require('express').Router();

const { editUserValidator, editAvatarValidator } = require('../middlewares/celebrateValidation');
const {
  getUsers, getUserInfo, getUserById, editUser, editUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserInfo);

usersRouter.patch('/me',
  editUserValidator,
  editUser);

usersRouter.patch('/me/avatar',
  editAvatarValidator,
  editUserAvatar);

usersRouter.get('/:id', getUserById);

module.exports = usersRouter;
