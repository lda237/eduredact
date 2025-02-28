"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWriters = exports.verifyWriter = void 0;
const db_1 = require("../config/db");
const User_1 = require("../models/User");
const verifyWriter = async (writerId) => {
    const userRepository = db_1.AppDataSource.getRepository(User_1.User);
    // Trouve le rédacteur
    const writer = await userRepository.findOne({
        where: { id: writerId, role: 'writer' },
    });
    if (!writer) {
        throw new Error('Writer not found');
    }
    // Vérifie le rédacteur
    writer.isVerified = true;
    await userRepository.save(writer);
    return writer;
};
exports.verifyWriter = verifyWriter;
const getWriters = async () => {
    const userRepository = db_1.AppDataSource.getRepository(User_1.User);
    // Trouve tous les rédacteurs
    const writers = await userRepository.find({
        where: { role: 'writer' },
    });
    return writers;
};
exports.getWriters = getWriters;
