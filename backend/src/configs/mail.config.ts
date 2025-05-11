import { ENV } from './env.config';

export const mailConfig = {
  service: 'Gmail',
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
