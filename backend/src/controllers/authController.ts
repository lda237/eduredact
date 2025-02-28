import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, phone, role } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return; // Exit early
    }

    // Check if the user already exists
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: 'User with this email already exists.' });
      return; // Exit early
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = userRepository.create({
      email,
      password: hashedPassword,
      phone: phone || null, // Optional field
      role: role || 'client', // Default role is 'client'
    });

    // Save the user to the database
    await userRepository.save(newUser);

    // Send success response
    res.status(201).json({
      message: 'User registered successfully.',
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging

    // Handle unknown errors
    if (error instanceof Error) {
      res.status(500).json({ message: 'Internal server error.', error: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return; // Exit early
    }

    // Find the user by email
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email }, select: ['id', 'email', 'password', 'role'] });

    // Check if the user exists and the password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return; // Exit early
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // Send success response
    res.status(200).json({
      message: 'Login successful.',
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging

    // Handle unknown errors
    if (error instanceof Error) {
      res.status(500).json({ message: 'Internal server error.', error: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
};