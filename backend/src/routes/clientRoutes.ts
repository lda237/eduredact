// src/routes/clientRoutes.ts
import express from "express";
import { getClientOrders, createOrder } from "../controllers/clientController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/orders", authMiddleware, getClientOrders);
router.post("/orders", authMiddleware, createOrder);

export default router;
