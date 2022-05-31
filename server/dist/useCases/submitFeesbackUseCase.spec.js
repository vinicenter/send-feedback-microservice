"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submitFeedbackUseCase_1 = require("./submitFeedbackUseCase");
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const SubmitFeedback = new submitFeedbackUseCase_1.SubmitFeedbackUseCase({ create: createFeedbackSpy }, { sendMail: sendMailSpy });
describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(SubmitFeedback.execute({
            type: 'bug',
            comment: 'comment',
            screenshot: 'data:image/png;base64,'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it('should not be able to submit a feedback without a type', async () => {
        await expect(SubmitFeedback.execute({
            type: '',
            comment: 'comment',
            screenshot: 'data:image/png;base64,'
        })).rejects.toThrow();
    });
    it('should not be able to submit a feedback without a comment', async () => {
        await expect(SubmitFeedback.execute({
            type: 'bug',
            comment: '',
            screenshot: 'data:image/png;base64,'
        })).rejects.toThrow();
    });
    it('should not be able to submit a feedback with a invalid screenshot', async () => {
        await expect(SubmitFeedback.execute({
            type: 'bug',
            comment: 'comment',
            screenshot: 'photo.png'
        })).rejects.toThrow();
    });
});
