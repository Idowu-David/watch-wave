

import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const data = await registerUser(firstName, lastName, email, password);

    return res.status(201).json({
      message: 'User registered successfully',
      data
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser(email, password);

    return res.status(200).json({
      message: 'Login successful',
      data
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
