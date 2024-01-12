// src/routes/userRouter.ts
import { Router } from 'express';
import * as UserController from '../controllers/userController';

const router = Router();
//User
router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);

export default router;
