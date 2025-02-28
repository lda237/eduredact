"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET, STRIPE_SECRET_KEY, EMAIL_USER, // Add this
EMAIL_PASSWORD, // Add this
 } = process.env;
if (!PORT || !DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME || !JWT_SECRET || !STRIPE_SECRET_KEY || !EMAIL_USER || !EMAIL_PASSWORD) {
    throw new Error('Missing environment variables');
}
exports.env = {
    port: parseInt(PORT, 10),
    db: {
        host: DB_HOST,
        port: parseInt(DB_PORT || '5432', 10),
        user: DB_USER,
        password: DB_PASSWORD,
        name: DB_NAME,
    },
    jwtSecret: JWT_SECRET,
    stripeSecretKey: STRIPE_SECRET_KEY,
    emailUser: EMAIL_USER, // Add this
    emailPassword: EMAIL_PASSWORD, // Add this
};
