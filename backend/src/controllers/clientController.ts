import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest ";
import { AppDataSource } from "../config/db";
import { Order } from "../models/Order";
import { User } from "../models/User";

export const getClientOrders = async (req: Request, res: Response): Promise<void> => {
  const authReq = req as AuthenticatedRequest; // Conversion
  if (!authReq.user) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }
  const clientId = Number(authReq.user.id);

  try {
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find({ where: { clientId } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};


export const createOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }
  const clientId = Number(req.user.id);
  const { serviceType, description, pageCount, urgency } = req.body;

  try {
    const price = calculatePrice(serviceType, pageCount, urgency);
    const orderRepository = AppDataSource.getRepository(Order);
    const userRepository = AppDataSource.getRepository(User);

    const client = await userRepository.findOne({ where: { id: clientId } });
    if (!client) {
      res.status(404).json({ error: "Client not found" });
      return;
    }

    const order = new Order();
    order.serviceType = serviceType;
    order.description = description;
    order.pageCount = pageCount;
    order.urgency = urgency;
    order.price = price;
    order.client = client;
    order.status = "pending";

    await orderRepository.save(order);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

function calculatePrice(serviceType: string, pageCount: number, urgency: string): number {
  let basePrice = 10;
  if (serviceType === "premium") {
    basePrice += 20;
  }
  if (urgency === "high") {
    basePrice += 30;
  }
  return basePrice * pageCount;
}
