// src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Các hàm khác như createUser, getUserById, updateUser, và deleteUser có thể được thêm vào đây
