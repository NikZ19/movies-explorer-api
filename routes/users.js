import express from 'express';
import { celebrate, Joi } from 'celebrate';
import { getCurrentUser, updateUser } from '../controllers/users';

const router = express.Router();

router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

export default router;
