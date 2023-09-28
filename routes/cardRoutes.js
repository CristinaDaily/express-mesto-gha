import { Router } from 'express';
import {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} from '../controllers/cards.js';

const cardRoutes = Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCard);
cardRoutes.delete('/:cardId', deleteCardById);
cardRoutes.put('/:cardId/likes', likeCard);
cardRoutes.delete('/:cardId/likes', dislikeCard);

export default cardRoutes;
