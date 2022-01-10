import express from 'express';
import { createUser, login, signout } from '../controllers/users';
import { validateSignUp, validateSignIn } from '../middlewares/validators';

const router = express.Router();

router.post('/signup', validateSignUp, createUser);

router.post('/signin', validateSignIn, login);

router.post('/signout', signout);

export default router;
