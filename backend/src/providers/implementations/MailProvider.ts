import nodemailer from 'nodemailer';

import { IMailProvider } from '../interfaces';
import { ENV, mailConfig } from '@/configs';

export class MailProvider implements IMailProvider {
  async sendPasswordMail(email: string, password: string): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport(mailConfig);

      const mailOptions = {
        from: ENV.EMAIL_USER,
        to: email,
        subject: 'Your Account Credentials',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px;">
            <h2 style="color: #000; text-align: center;">Your Account Credentials</h2>
            <p>Hello,</p>
            <p>Your account has been created successfully. Below are your login credentials. Please keep this information secure and do not share it with anyone.</p>
            <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="font-size: 16px; margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="font-size: 16px; margin: 0;"><strong>Password:</strong> ${password}</p>
            </div>
            <p style="text-align: center; color: #d9534f;"><strong>Important: Do not share your email or password with anyone to protect your account security.</strong></p>
            <p>Please log in and change your password as soon as possible for added security. If you did not request this account, contact our support team immediately.</p>
            <p>Thank you,</p>
            <p><strong>Your Support Team</strong></p>
            <hr style="border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #888; text-align: center;">
              Need help? Contact us at <a href="mailto:support@yourwebsite.com" style="color: #007bff;">support@yourwebsite.com</a>
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return false;
    }
  }
}
