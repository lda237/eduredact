"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = void 0;
const stripe_1 = __importDefault(require("stripe"));
const db_1 = require("../config/db");
const Payment_1 = require("../models/Payment");
const env_1 = require("../config/env");
const stripe = new stripe_1.default(env_1.env.stripeSecretKey, { apiVersion: '2025-01-27.acacia' });
const createPayment = async (orderId, amount) => {
    const paymentRepository = db_1.AppDataSource.getRepository(Payment_1.Payment);
    // Crée un paiement avec Stripe
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convertir en centimes
        currency: 'eur',
    });
    // Crée un enregistrement de paiement dans la base de données
    const payment = new Payment_1.Payment();
    payment.orderId = orderId;
    payment.amount = amount;
    payment.paymentMethod = 'stripe';
    payment.status = 'pending';
    await paymentRepository.save(payment);
    return { paymentIntent, payment };
};
exports.createPayment = createPayment;
