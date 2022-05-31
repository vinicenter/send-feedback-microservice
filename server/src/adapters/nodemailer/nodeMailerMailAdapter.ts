import { mailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer';

export class NodemailerMailAdapter implements mailAdapter {
    async sendMail(data: SendMailData) {
        return;
    }
}