"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const pino_http_1 = __importDefault(require("pino-http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../utils");
const router_1 = require("../router");
exports.server = (0, express_1.default)();
dotenv_1.default.config();
exports.prisma = new client_1.PrismaClient();
exports.server.use(pino_http_1.default);
async function main() {
    await exports.prisma.$connect();
    console.log('Connected to Prisma and mongoDB');
}
main()
    .catch((e) => {
    console.log('Error in connecting database');
    throw e;
})
    .finally(async () => {
    await exports.prisma.$disconnect();
});
exports.server.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));
exports.server.use(express_1.default.json());
exports.server.get('/', (req, res) => {
    res.status(201).json({
        ok: true,
        message: 'app is running successfully',
    });
});
exports.server.use('/api/v1', router_1.userRouter);
exports.server.all('*', (req, _res, next) => {
    next(new utils_1.AppError(`The requested page ${req.originalUrl} was not found`, 404));
});
exports.server.use((err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        ok: false,
        status: err.status,
        message: err.message,
    });
});
