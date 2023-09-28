import Card from '../models/card.js';

export const getCards = (req, res) => {
  Card.find({})
    .populate(['owner'])
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: 'Oшибка на стороне сервера', err }));
};

export const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки', err });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', err });
    });
};

export const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new Error('NotFound');
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.message === 'NotFound') {
        return res.status(404).send({ message: 'Карточка с указанным id не найдена' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера', error });
    });
};

export const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { runValidators: true, new: true },
  ).then((card) => {
    if (!card) {
      throw new Error('NotFound');
    }
    res.send(card);
  })
    .catch((error) => {
      if (error.message === 'NotFound') {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка', error });
      }
      return res.status(500).send({ message: 'Ошибка дислайка карточки', error });
    });
};

export const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { runValidators: true, new: true },
  )
    .then((card) => {
      if (!card) {
        throw new Error('NotFound');
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.message === 'NotFound') {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка', error });
      }
      return res.status(500).send({ message: 'Ошибка лайка карточки', error });
    });
};
