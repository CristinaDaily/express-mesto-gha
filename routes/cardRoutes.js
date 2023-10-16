import { Router } from 'express';
import {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} from '../controllers/cards.js';
import { validateCard, validateObjId } from '../middleware/validate.js';

const cardRoutes = Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', validateCard, createCard);
cardRoutes.delete('/:cardId', validateObjId, deleteCardById);
cardRoutes.put('/:cardId/likes', validateObjId, likeCard);
cardRoutes.delete('/:cardId/likes', validateObjId, dislikeCard);

export default cardRoutes;
