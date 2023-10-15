import { Router } from 'express';
import userRoutes from './userRoutes.js';
import cardRoutes from './cardRoutes.js';
import adminRoutes from './adminRoutes.js';
import auth from '../middleware/auth.js';

const router = Router();

router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);
router.use('/', adminRoutes);

export default router;
