const { celebrate, Joi } = require('celebrate');

const registrationValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
});

const editUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const editAvatarValidator = celebrate({
  body: Joi.object().keys(
    { avatar: Joi.string().uri() },
  ),
});

const newCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
});

const cardIdValidator = celebrate(
  { params: Joi.object().keys({ cardId: Joi.string().length(24) }) },
);

module.exports = {
  registrationValidator,
  loginValidator,
  editUserValidator,
  editAvatarValidator,
  newCardValidator,
  cardIdValidator,
};
