import { AppDataSource } from '../config/db';
import { Order } from '../models/Order';
import { User } from '../models/User';

export const createOrder = async (
  serviceType: string,
  description: string,
  pageCount: number,
  urgency: string,
  clientId: number
) => {
  const orderRepository = AppDataSource.getRepository(Order);
  const userRepository = AppDataSource.getRepository(User);

  // Trouve le client
  const client = await userRepository.findOne({ where: { id: clientId } });
  if (!client) {
    throw new Error('Client not found');
  }

  // Crée une nouvelle commande
  const order = new Order();
  order.serviceType = serviceType;
  order.description = description;
  order.pageCount = pageCount;
  order.urgency = urgency;
  order.price = calculatePrice(serviceType, pageCount, urgency);
  order.client = client;
  order.status = 'pending';

  // Sauvegarde la commande dans la base de données
  await orderRepository.save(order);
  return order;
};

export const getOrdersByClient = async (clientId: number) => {
  const orderRepository = AppDataSource.getRepository(Order);

  // Trouve toutes les commandes du client
  const orders = await orderRepository.find({
    where: { client: { id: clientId } },
    relations: ['client'], // Charge la relation avec le client
  });

  return orders;
};

const calculatePrice = (serviceType: string, pageCount: number, urgency: string) => {
  const basePrice = serviceType === 'redaction' ? 5000 : 3000; // XOF par page
  const urgencyMultiplier = urgency === 'express' ? 1.5 : 1;
  return basePrice * pageCount * urgencyMultiplier;
};