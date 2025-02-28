import { AppDataSource } from '../config/db';
import { User } from '../models/User';

export const verifyWriter = async (writerId: number) => {
  const userRepository = AppDataSource.getRepository(User);

  // Trouve le rédacteur
  const writer = await userRepository.findOne({
    where: { id: writerId, role: 'writer' },
  });
  if (!writer) {
    throw new Error('Writer not found');
  }

  // Vérifie le rédacteur
  writer.isVerified = true;
  await userRepository.save(writer);
  return writer;
};

export const getWriters = async () => {
  const userRepository = AppDataSource.getRepository(User);

  // Trouve tous les rédacteurs
  const writers = await userRepository.find({
    where: { role: 'writer' },
  });

  return writers;
};