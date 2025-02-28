"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByClient = exports.createOrder = void 0;
const db_1 = require("../config/db");
const Order_1 = require("../models/Order");
const User_1 = require("../models/User");
const createOrder = async (serviceType, description, pageCount, urgency, clientId) => {
    const orderRepository = db_1.AppDataSource.getRepository(Order_1.Order);
    const userRepository = db_1.AppDataSource.getRepository(User_1.User);
    // Trouve le client
    const client = await userRepository.findOne({ where: { id: clientId } });
    if (!client) {
        throw new Error('Client not found');
    }
    // Crée une nouvelle commande
    const order = new Order_1.Order();
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
exports.createOrder = createOrder;
const getOrdersByClient = async (clientId) => {
    const orderRepository = db_1.AppDataSource.getRepository(Order_1.Order);
    // Trouve toutes les commandes du client
    const orders = await orderRepository.find({
        where: { client: { id: clientId } },
        relations: ['client'], // Charge la relation avec le client
    });
    return orders;
};
exports.getOrdersByClient = getOrdersByClient;
const calculatePrice = (serviceType, pageCount, urgency) => {
    const basePrice = serviceType === 'redaction' ? 5000 : 3000; // XOF par page
    const urgencyMultiplier = urgency === 'express' ? 1.5 : 1;
    return basePrice * pageCount * urgencyMultiplier;
};
