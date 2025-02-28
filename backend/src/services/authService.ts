import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/db';
import { User } from '../models/User';

export const register = async (email: string, password: string, phone: string, role: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User();
  user.email = email;
  user.password = hashedPassword;
  user.phone = phone;
  user.role = role;

  await userRepository.save(user);
  return user;
};

export const login = async (email: string, password: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return { token, user };
};