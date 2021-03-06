"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const nodeMailerMailAdapter_1 = require("./adapters/nodemailer/nodeMailerMailAdapter");
const prismaFeedbacksRepository_1 = require("./repositories/prisma/prismaFeedbacksRepository");
const submitFeedbackUseCase_1 = require("./useCases/submitFeedbackUseCase");
exports.routes = express_1.default.Router();
exports.routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbacksRepository = new prismaFeedbacksRepository_1.PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new nodeMailerMailAdapter_1.NodemailerMailAdapter();
    const submitFeedbackUseCase = new submitFeedbackUseCase_1.SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);
    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    });
    return res.status(201).json();
});
exports.routes.get('/', async (req, res) => {
    return res.status(201).json({
        message: 'Hello World from server'
    });
});
