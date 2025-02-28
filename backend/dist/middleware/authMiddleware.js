"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        if (!process.env.JWT_SECRET) {
            res.status(500).json({ message: "Server configuration error: JWT_SECRET is missing" });
            return;
        }
        // Vérifier et décoder le JWT
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // 🔥 **CORRECTION IMPORTANTE : Ajout explicite de req.user**
        req.user = { id: decoded.id, role: decoded.role };
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.authMiddleware = authMiddleware;
