"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyWriter = void 0;
const db_1 = require("../config/db");
const User_1 = require("../models/User");
const verifyWriter = async (req, res, next) => {
    try {
        const userId = req.body.userId; // Assuming the request body contains the user ID
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        const userRepository = db_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        user.isVerified = true; // Mark the user as verified
        await userRepository.save(user);
        res.status(200).json({ message: 'Writer verified successfully', user });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.verifyWriter = verifyWriter;
