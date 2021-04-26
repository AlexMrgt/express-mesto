const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const _urlValidator = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.message('Невалидный URL');
};

// /users validation

const registrationValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(_urlValidator),
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
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const editAvatarValidator = celebrate({
  body: Joi.object().keys(
    {
      avatar: Joi.string().required().custom(_urlValidator),
    },
  ),
});

// /cards validation

const newCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(_urlValidator),
  }),
});

const userIdValidator = celebrate(
  { params: Joi.object().keys({ userId: Joi.string().hex().length(24) }) },
);

const cardIdValidator = celebrate(
  { params: Joi.object().keys({ cardId: Joi.string().hex().length(24) }) },
);

module.exports = {
  registrationValidator,
  loginValidator,
  userIdValidator,
  editUserValidator,
  editAvatarValidator,
  newCardValidator,
  cardIdValidator,
};
