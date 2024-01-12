// src/routes/userRouter.ts
import { Router } from 'express';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/', UserController.getAllUsers);
// Thêm các route khác như create, read, update, delete ở đây

export default router;
