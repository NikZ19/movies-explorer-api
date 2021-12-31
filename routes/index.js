import express from 'express';
import auth from '../middlewares/auth';
import NotFoundError from '../errors/NotFoundError';

import userRoute from './users';
import movieRoute from './movies';
import authRoute from './auth';

const router = express.Router();

router.use('/', authRoute);
router.use(auth);
router.use('/users', userRoute);
router.use('/movies', movieRoute);
router.use('*', () => {
  throw new NotFoundError('Страница не найдена!');
});

export default router;
