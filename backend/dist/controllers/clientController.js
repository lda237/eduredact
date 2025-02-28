"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.getClientOrders = void 0;
const db_1 = require("../config/db");
const Order_1 = require("../models/Order");
const User_1 = require("../models/User");
const getClientOrders = async (req, res) => {
    const clientId = req.user?.id; // Safely access `user.id` with optional chaining
    try {
        const orderRepository = db_1.AppDataSource.getRepository(Order_1.Order);
        const orders = await orderRepository.find({ where: { clientId: clientId ? Number(clientId) : undefined } });
        res.status(200).json(orders);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
exports.getClientOrders = getClientOrders;
const createOrder = async (req, res) => {
    const clientId = Number(req.user?.id);
    const { serviceType, description, pageCount, urgency } = req.body;
    try {
        const price = calculatePrice(serviceType, pageCount, urgency);
        const orderRepository = db_1.AppDataSource.getRepository(Order_1.Order);
        const userRepository = db_1.AppDataSource.getRepository(User_1.User);
        // Vérifie si le client existe
        const client = await userRepository.findOne({ where: { id: Number(clientId) } });
        if (!client) {
            res.status(404).json({ error: 'Client not found' });
            return;
        }
        // Crée une nouvelle commande
        const order = new Order_1.Order();
        order.serviceType = serviceType;
        order.description = description;
        order.pageCount = pageCount;
        order.urgency = urgency;
        order.price = price;
        order.client = client; // Associe la commande au client
        order.status = 'pending'; // Statut par défaut
        await orderRepository.save(order);
        res.status(201).json(order);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
exports.createOrder = createOrder;
function calculatePrice(serviceType, pageCount, urgency) {
    // Implement the logic to calculate the price based on serviceType, pageCount, and urgency
    let basePrice = 10; // Example base price
    if (serviceType === 'premium') {
        basePrice += 20;
    }
    if (urgency === 'high') {
        basePrice += 30;
    }
    return basePrice * pageCount;
}
