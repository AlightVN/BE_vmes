// src/controllers/userController.ts
import { Request, Response } from "express";
import { User } from "../entities/User";
import DataSource from "../config/db";

// Create
export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = DataSource.getRepository(User);
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.role = req.body.role;
    const savedUser = await userRepository.save(newUser); // Save the user to the database
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read (Get all users with pagination)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = DataSource.getRepository(User);
    const { page = 1, limit = 10 } = req.query;
    
    const [users, total] = await userRepository.findAndCount({
      take: +limit,
      skip: (+page - 1) * +limit,
    });

    res.json({ users, total });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userRepository = DataSource.getRepository(User);
    const userId = parseInt(req.params.id);
    const { name, role } = req.body;

    const user = await userRepository.findOneBy({id: userId});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name;
    user.role = role;

    const updatedUser = await userRepository.save(user);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userRepository = DataSource.getRepository(User);
    const userId = parseInt(req.params.id);

    const user = await userRepository.findOneBy({id: userId});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await userRepository.remove(user);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
