import {celebrate, Joi, Segments} from 'celebrate';

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avarar: Joi.string().uri(),
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
const validateId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const validateLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export {
  validateUser, validateProfile, validateAvatar, validateId, validateLoginData,
};
