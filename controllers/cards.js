import Card from '../models/card.js';
import NotFoundError from '../errors/notFoundErr.js';
import BadRequestError from '../errors/badRequestErr.js';
import ForbiddenError from '../errors/forbiddenError.js'

export const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner'])
    .then((cards) => res.send(cards))
    .catch(next);
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      next(err);
    });
};

export const deleteCardById = (req, res, next) => {
  const userId = req.user._id;

  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }

      if (card.owner.toString() !== userId) {
        throw new ForbiddenError('Невозможно удалить карточки другого пользователя');
      }
      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then((deletedCard) => {
      res.send(deletedCard);
    })
    .catch(next);
  /*
      if (error.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Передан не валидный id' });
    } */
};

const updateCardLikes = (req, res, updateAction, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    updateAction,
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.send(card);
  })
    .catch(next);
  /*
      if (error.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Передан не валидный id' });
      } */
};

export const likeCard = (req, res, next) => {
  updateCardLikes(req, res, { $addToSet: { likes: req.user._id } }, next);
};

export const dislikeCard = (req, res, next) => {
  updateCardLikes(req, res, { $pull: { likes: req.user._id } }, next);
};
