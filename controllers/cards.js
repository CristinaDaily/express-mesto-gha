import Card from '../models/card.js';
import HTTP_STATUS from '../errorStatus.js';

const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = HTTP_STATUS;
export const getCards = (req, res) => {
  Card.find({})
    .populate(['owner'])
    .then((cards) => res.send(cards))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', err }));
};

export const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки', err });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', err });
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
        return res.status(NOT_FOUND).send({ message: 'Карточка с указанным id не найдена' });
      }
      if (error.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Передан не валидный id' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error });
    });
};

const updateCardLikes = (req, res, updateAction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    updateAction,
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new Error('NotFound');
    }
    res.send(card);
  })
    .catch((error) => {
      if (error.message === 'NotFound') {
        return res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      }
      if (error.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Передан не валидный id' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error });
    });
};

export const likeCard = (req, res) => {
  updateCardLikes(req, res, { $addToSet: { likes: req.user._id } });
};

export const dislikeCard = (req, res) => {
  updateCardLikes(req, res, { $pull: { likes: req.user._id } });
};
