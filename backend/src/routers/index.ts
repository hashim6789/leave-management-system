import express from 'express';
import { authRouter } from './auth.routes';
import { workScheduleRouter } from './work-schedule.routes';
import { userRouter } from './user.routes';

export const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/work-schedules', workScheduleRouter);
apiRouter.use('/users', userRouter);
