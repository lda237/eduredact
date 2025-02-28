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
const createPayment = async (req, res) => {
    try {
        const { orderId, amount } = req.body;
        // Validate input
        if (!orderId || !amount) {
            res.status(400).json({ error: 'orderId and amount are required' });
            return; // Stop further execution
        }
        const paymentRepository = db_1.AppDataSource.getRepository(Payment_1.Payment);
        // Create a payment with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: 'eur',
        });
        // Create a payment record in the database
        const payment = new Payment_1.Payment();
        payment.orderId = orderId;
        payment.amount = amount;
        payment.paymentMethod = 'stripe';
        payment.status = 'pending';
        await paymentRepository.save(payment);
        // Send success response
        res.status(201).json({ paymentIntent, payment });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
};
exports.createPayment = createPayment;
