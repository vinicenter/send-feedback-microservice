"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackUseCase = void 0;
class SubmitFeedbackUseCase {
    constructor(feedbackRepository, mailAdapter) {
        this.feedbackRepository = feedbackRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request) {
        const { type, comment, screenshot } = request;
        if (!type || !comment) {
            throw new Error('Invalid request');
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
            throw new Error('Screenshot must be a base64 encoded png image');
        }
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        });
        await this.mailAdapter.sendMail({
            subject: 'Novo feedback no app',
            body: [
                '<div style="font-family: sans-serif; font-size: 16px, color #222;">',
                `<p>${type}</p>`,
                `<p>${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />` : ``,
                '</div>'
            ].join('\n')
        });
    }
}
exports.SubmitFeedbackUseCase = SubmitFeedbackUseCase;
