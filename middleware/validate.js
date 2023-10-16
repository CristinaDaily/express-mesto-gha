import { celebrate, Joi, Segments } from 'celebrate';

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
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
    avarar: Joi.string().uri(),
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
    link: Joi.string().uri().required(),
  }),
});

export {
  validateUser, validateProfile, validateAvatar, validateObjId,
  validateLoginData, validateCard, validateCardId,
};
