import User from '../models/user.js';

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'Ошибка на стороне сервера', err }));
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
        return res.status(404).send({ message: 'Пользователь по указанному id не найден' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', error });
    });
};

export const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidatorError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя', error });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', error });
    });
};

export const updateUser = (req, res) => {
  const userUpdates = req.body;
  User.findByIdAndUpdate(req.user._id, { $set: userUpdates }, { new: true })
    .then((user) => {
      if (!user) {
        throw new Error('NotFound');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь с указанным id не найден' });
      }
      if (error.name === 'ValidatorError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля', error });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', error });
    });
};

export const updateAvatar = (req, res) => {
  const avatarUrl = req.body;
  User.findByIdAndUpdate(req.user._id, avatarUrl, { new: true })
    .then((user) => {
      if (!user) {
        throw new Error('NotFound');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь с указанным id не найден' });
      }
      if (error.name === 'ValidatorError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара', error });
      }

      return res.status(500).send({ message: 'Ошибка на стороне сервера', error });
    });
};
