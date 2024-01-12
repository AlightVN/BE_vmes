// src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User';
//Create
export const createUser = async (req: Request, res: Response) => {
    try {
      const { name, role } = req.body;
      const newUser = await User.create({ name, role });
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
//Read
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


