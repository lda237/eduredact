"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/clientRoutes.ts
const express_1 = __importDefault(require("express"));
const clientController_1 = require("../controllers/clientController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/orders", authMiddleware_1.authMiddleware, clientController_1.getClientOrders);
router.post("/orders", authMiddleware_1.authMiddleware, clientController_1.createOrder);
exports.default = router;
