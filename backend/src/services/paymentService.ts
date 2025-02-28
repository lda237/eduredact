import Stripe from 'stripe';
import { AppDataSource } from '../config/db';
import { Payment } from '../models/Payment';
import { env } from '../config/env';

const stripe = new Stripe(env.stripeSecretKey, { apiVersion: '2025-01-27.acacia' });

export const createPayment = async (orderId: number, amount: number) => {
  const paymentRepository = AppDataSource.getRepository(Payment);

  // Crée un paiement avec Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convertir en centimes
    currency: 'eur',
  });

  // Crée un enregistrement de paiement dans la base de données
  const payment = new Payment();
  payment.orderId = orderId;
  payment.amount = amount;
  payment.paymentMethod = 'stripe';
  payment.status = 'pending';

  await paymentRepository.save(payment);
  return { paymentIntent, payment };
};