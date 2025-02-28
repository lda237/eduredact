import { Request, Response } from 'express';
import Stripe from 'stripe';
import { AppDataSource } from '../config/db';
import { Payment } from '../models/Payment';
import { env } from '../config/env';

const stripe = new Stripe(env.stripeSecretKey, { apiVersion: '2025-01-27.acacia' });

export const createPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, amount } = req.body;

    // Validate input
    if (!orderId || !amount) {
      res.status(400).json({ error: 'orderId and amount are required' });
      return; // Stop further execution
    }

    const paymentRepository = AppDataSource.getRepository(Payment);

    // Create a payment with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'eur',
    });

    // Create a payment record in the database
    const payment = new Payment();
    payment.orderId = orderId;
    payment.amount = amount;
    payment.paymentMethod = 'stripe';
    payment.status = 'pending';

    await paymentRepository.save(payment);

    // Send success response
    res.status(201).json({ paymentIntent, payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};