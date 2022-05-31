import { FeedbacksRepository } from "../repositories/feedbacksRepository";
import { mailAdapter } from "../adapters/mailAdapter";

interface submitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: mailAdapter
    ) { }

    async execute( request: submitFeedbackUseCaseRequest ) {
        const { type, comment, screenshot } = request;

        if ( !type || !comment ) {
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