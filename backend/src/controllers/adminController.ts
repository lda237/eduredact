import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/db';
import { User } from '../models/User';

export const verifyWriter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.body.userId; // Assuming the request body contains the user ID
    if (!userId) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    user.isVerified = true; // Mark the user as verified
    await userRepository.save(user);

    res.status(200).json({ message: 'Writer verified successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};