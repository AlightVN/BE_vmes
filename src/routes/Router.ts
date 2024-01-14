// src/routes/userRouter.ts
import { Router } from 'express';
import * as UserController from '../controllers/userController';
import * as OrderController from '../controllers/orderController';

const router = Router();

// User
router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

//orders
router.get('/orders', OrderController.getAllOrders);
router.post('/orders', OrderController.createOrder);
router.put('/orders/:id', OrderController.updateOrder);
router.delete('orders/:id', OrderController.deleteOrder);

export default router;
