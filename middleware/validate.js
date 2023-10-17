import { celebrate, Joi, Segments } from 'celebrate';

const avatarRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}(:\d{1,5})?([/?#]\S*)?$/;

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(avatarRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().regex(avatarRegex),
  }),
});

const validateObjId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const validateCardId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const validateLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(avatarRegex).required(),
  }),
});

export {
  validateUser, validateProfile, validateAvatar, validateObjId,
  validateLoginData, validateCard, validateCardId,
};
