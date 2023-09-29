import User from '../models/user.js';
import HTTP_STATUS from '../errorStatus.js';

const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = HTTP_STATUS;
export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', err }));
};

export const getUserByID = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new Error('NotFound');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.message === 'NotFound') {
        return res.status(NOT_FOUND).send({ message: 'Пользователь по указанному id не найден' });
      }
      if (error.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Передан не валидный id' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error });
    });
};

export const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя', error });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error });
    });
};

const updateProfile = (req, res, updateOption) => {
  User.findByIdAndUpdate(req.user._id, updateOption, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new Error('NotFound');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.message === 'NotFound') {
        return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным id не найден' });
      }
      if (error.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении', error });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error });
    });
};

export const updateUser = (req, res) => {
  const userUpdates = req.body;
  updateProfile(req, res, { $set: userUpdates });
};

export const updateAvatar = (req, res) => {
  const avatarUrl = req.body;
  updateProfile(req, res, avatarUrl);
};
