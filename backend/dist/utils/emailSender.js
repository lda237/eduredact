"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: env_1.env.emailUser,
        pass: env_1.env.emailPassword,
    },
});
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: env_1.env.emailUser,
        to,
        subject,
        text,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
};
exports.sendEmail = sendEmail;
