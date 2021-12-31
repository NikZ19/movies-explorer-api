import express from 'express';
import { celebrate, Joi } from 'celebrate';
import { createUser, login, signout } from '../controllers/users';

const router = express.Router();

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(16).required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);

router.post('/signout', signout);

export default router;
