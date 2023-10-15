import { Router } from 'express';
import { createUser, login } from '../controllers/users.js';

const adminRoutes = Router();

adminRoutes.post('/signin', login);
adminRoutes.post('/signup', createUser);

export default adminRoutes;
