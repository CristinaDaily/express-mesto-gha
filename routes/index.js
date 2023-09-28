import { Router } from 'express';
import userRoutes from './userRoutes.js';
import cardRoutes from './cardRoutes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

export default router;
