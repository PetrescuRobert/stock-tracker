import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from '@/lib/nodemailer/templates';
export const trnasporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendWelcomeEmail = async ({
    email,
    name,
    intro,
}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace(
        '{{name}}',
        name
    ).replace('{{intro}}', intro);

    const mailOptions = {
        from: `"Signalist" <noreplay@signalist.com>`,
        to: email,
        subject: 'Welcome to Signalist!',
        text: 'Thanks for joining Signalist!',
        html: htmlTemplate,
    };

    await trnasporter.sendMail(mailOptions);
};
