"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const writerRoutes_1 = __importDefault(require("./routes/writerRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const documentRoutes_1 = __importDefault(require("./routes/documentRoutes"));
const errorHandler_1 = require("./utils/errorHandler");
const logger_1 = require("./utils/logger");
// Charger les variables d'environnement
dotenv_1.default.config();
// Initialiser l'application Express
const app = (0, express_1.default)();
// Middleware pour parser le JSON
app.use(express_1.default.json());
// Middleware pour gérer les CORS
app.use((0, cors_1.default)());
// Middleware pour logger les requêtes
app.use(logger_1.logger);
// Connexion à la base de données
(0, db_1.connectDB)();
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/client', clientRoutes_1.default);
app.use('/api/writer', writerRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/payments', paymentRoutes_1.default);
app.use('/api/documents', documentRoutes_1.default);
// Middleware pour gérer les erreurs
app.use(errorHandler_1.errorHandler);
// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
