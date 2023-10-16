import { Router } from 'express';
import { createUser, login } from '../controllers/users.js';
import { validateUser, validateLoginData } from '../middleware/validate.js';

const adminRoutes = Router();

adminRoutes.post('/signin', validateLoginData, login);
adminRoutes.post('/signup', validateUser, createUser);

export default adminRoutes;
