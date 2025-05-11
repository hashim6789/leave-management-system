import express from 'express';
import { authRouter } from './auth.routes';
import { workScheduleRouter } from './work-schedule.routes';
import { userRouter } from './user.routes';
import { groupRouter } from './group.routes';

export const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/work-schedules', workScheduleRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/groups', groupRouter);
