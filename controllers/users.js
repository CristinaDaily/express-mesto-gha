import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import generateTtoken from '../utils/jwt.js';
import NotFoundError from '../errors/notFoundErr.js';
import BadRequestError from '../errors/badRequestErr.js';
import ConflictError from '../errors/conflictError.js';
import AuthenticationError from '../errors/authenticationError.js';

const SOLT_ROUNDS = 10;
const MONGO_DUPLCATE_ERROR_CODE = 11000;

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const getUserByID = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res.send(user);
    })
    .catch(next);
  /*
      if (error.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Передан не валидный id' });
      }
    }); */
};

export const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, SOLT_ROUNDS).then((hash) => User.create({
    name, about, avatar, email, password: hash,
  })).then((user) => {
    const userWithourPassword = user.toObject();
    delete userWithourPassword.password;
    res.send(userWithourPassword);
  })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      if (error.code === MONGO_DUPLCATE_ERROR_CODE) {
        next(new ConflictError('Такой пользователь уже существует'));
      }
      next(error);
    });
};

const updateProfile = (req, res, updateOption, next) => {
  User.findByIdAndUpdate(req.user._id, updateOption, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным id не найден');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      next(error);
    });
};

export const updateUser = (req, res) => {
  const userUpdates = req.body;
  updateProfile(req, res, { $set: userUpdates });
};

export const updateAvatar = (req, res) => {
  const avatarUrl = req.body;
  updateProfile(req, res, { $set: avatarUrl });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = generateTtoken({ _id: user._id });
    res.cookie('jwt', token, {
      maxAge: 3600000, httpOnly: true, sameSite: true,
    });
    return res.send({ email: user.email });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    if (error.message === 'NotAutanticate') {
      return next(new AuthenticationError('Неправильные почта или пароль'));
    }
    return next(error);
  }
};

export const getCurrentUser = (req, res, next) => {
  const currentUser = req.user._id;
  User.findById(currentUser)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res.send(user);
    })
    .catch(next);
};
