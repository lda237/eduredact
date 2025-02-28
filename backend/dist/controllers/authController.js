"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const db_1 = require("../config/db");
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    const { email, password, phone, role } = req.body;
    try {
        // Validate input
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return; // Exit early
        }
        // Check if the user already exists
        const userRepository = db_1.AppDataSource.getRepository(User_1.User);
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            res.status(409).json({ message: 'User with this email already exists.' });
            return; // Exit early
        }
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create a new user
        const newUser = userRepository.create({
            email,
            password: hashedPassword,
            phone: phone || null, // Optional field
            role: role || 'client', // Default role is 'client'
        });
        // Save the user to the database
        await userRepository.save(newUser);
        // Send success response
        res.status(201).json({
            message: 'User registered successfully.',
            user: { id: newUser.id, email: newUser.email, role: newUser.role },
        });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        // Handle unknown errors
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate input
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return; // Exit early
        }
        // Find the user by email
        const userRepository = db_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepository.findOne({ where: { email }, select: ['id', 'email', 'password', 'role'] });
        // Check if the user exists and the password matches
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return; // Exit early
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Send success response
        res.status(200).json({
            message: 'Login successful.',
            token,
            user: { id: user.id, email: user.email, role: user.role },
        });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        // Handle unknown errors
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
};
exports.login = login;
