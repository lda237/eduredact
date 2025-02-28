import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import clientRoutes from './routes/clientRoutes';
import writerRoutes from './routes/writerRoutes';
import adminRoutes from './routes/adminRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import documentRoutes from './routes/documentRoutes';
import { errorHandler } from './utils/errorHandler';
import { logger } from './utils/logger';
import helmet from 'helmet';
import estimateRoutes from './routes/estimateRoutes';

// Charger les variables d'environnement
dotenv.config();

// Vérification des variables d'environnement
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing environment variable: ${envVar}`);
    process.exit(1); // Arrêter l'exécution si une variable est manquante
  }
});

// Initialiser l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour gérer les CORS
app.use(cors());

// Middleware pour sécuriser l'application
app.use(helmet());

// Middleware pour logger les requêtes
app.use(logger);

// Utiliser les routes d'estimation
app.use(estimateRoutes);

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/writer', writerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/documents', documentRoutes);

// Middleware pour gérer les erreurs
app.use(errorHandler);

// Démarrer le serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
