import { Router } from 'express';
import {
  getUsers, getUserByID, updateUser, updateAvatar, getCurrentUser,
} from '../controllers/users.js';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/me', getCurrentUser);
userRoutes.get('/:userId', getUserByID);
userRoutes.patch('/me/', updateUser);
userRoutes.patch('/me/avatar', updateAvatar);

export default userRoutes;
