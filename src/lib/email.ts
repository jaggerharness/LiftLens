import nodemailer from 'nodemailer';
import aws from 'aws-sdk';

// Configure AWS SES
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    SES: new aws.SES({ apiVersion: '2010-12-01' }),
});

// Function to send email
async function sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
        // Send email
        await transporter.sendMail({
            from: 'SENDER_EMAIL_ADDRESS',
            to,
            subject,
            text: body,
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default sendEmail;
