import { Router } from 'express';
import { 
  getUsers, getUserByID, createUser, updateUser, updateAvatar,
} from '../controllers/users.js';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserByID);
userRoutes.post('/', createUser);
userRoutes.patch('/me/', updateUser);
userRoutes.patch('/me/avatar', updateAvatar);

export default userRoutes;
