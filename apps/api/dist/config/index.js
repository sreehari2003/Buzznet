"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENV = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    CLINETID: process.env.CLINETID,
    CLINETSECRET: process.env.CLINETSECRET,
    JWT_SECRET: process.env.JWT_SECRET,
};
