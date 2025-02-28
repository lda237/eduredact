"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const User_1 = require("../models/User");
const register = async (email, password, phone, role) => {
    const userRepository = db_1.AppDataSource.getRepository(User_1.User);
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = new User_1.User();
    user.email = email;
    user.password = hashedPassword;
    user.phone = phone;
    user.role = role;
    await userRepository.save(user);
    return user;
};
exports.register = register;
const login = async (email, password) => {
    const userRepository = db_1.AppDataSource.getRepository(User_1.User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
        throw new Error('Email ou mot de passe incorrect');
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
};
exports.login = login;
