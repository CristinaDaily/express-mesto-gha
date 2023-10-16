import { Router } from 'express';
import {
  getUsers, getUserByID, updateUser, updateAvatar, getCurrentUser,
} from '../controllers/users.js';
import { validateProfile, validateAvatar, validateObjId } from '../middleware/validate.js';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/me', getCurrentUser);
userRoutes.get('/:userId', validateObjId, getUserByID);
userRoutes.patch('/me/', validateProfile, updateUser);
userRoutes.patch('/me/avatar', validateAvatar, updateAvatar);

export default userRoutes;
