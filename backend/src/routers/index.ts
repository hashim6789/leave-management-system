import express from 'express';
import { authRouter } from './auth.routes';
import { workScheduleRouter } from './work-schedule.routes';

export const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/work-schedules', workScheduleRouter);
