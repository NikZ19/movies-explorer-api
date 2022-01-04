import express from 'express';
import { getCurrentUser, updateUser } from '../controllers/users';
import { validateUserUpdate } from '../middlewares/validators';

const router = express.Router();

router.get('/me', getCurrentUser);
router.patch('/me', validateUserUpdate, updateUser);

export default router;
