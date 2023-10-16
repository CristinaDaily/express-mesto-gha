import { Router } from 'express';
import {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} from '../controllers/cards.js';
import { validateCard, validateCardId } from '../middleware/validate.js';

const cardRoutes = Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', validateCard, createCard);
cardRoutes.delete('/:cardId', validateCardId, deleteCardById);
cardRoutes.put('/:cardId/likes', validateCardId, likeCard);
cardRoutes.delete('/:cardId/likes', validateCardId, dislikeCard);

export default cardRoutes;
