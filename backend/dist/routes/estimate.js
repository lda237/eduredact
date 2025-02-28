"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
function estimateHandler(serviceType, pageCount, urgency) {
    const pricePerPage = {
        'redaction': 5000,
        'translation': 3000,
        'correction': 2000,
    };
    const timePerPage = {
        'redaction': 2,
        'translation': 1,
        'correction': 0.5,
    };
    const basePrice = pricePerPage[serviceType] * pageCount;
    const baseTime = timePerPage[serviceType] * pageCount;
    let urgencyMultiplier = 1;
    if (urgency === 'express') {
        urgencyMultiplier = 1.5;
    }
    const finalPrice = basePrice * urgencyMultiplier;
    const finalTime = baseTime / urgencyMultiplier;
    return {
        price: finalPrice,
        time: finalTime,
    };
}
router.post('/estimate', async (req, res) => {
    const { serviceType, pageCount, urgency } = req.body;
    try {
        const result = estimateHandler(serviceType, pageCount, urgency);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.default = router;
