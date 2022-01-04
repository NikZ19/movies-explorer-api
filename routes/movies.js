import express from 'express';
import { getSavedMovies, createMovie, removeMovie } from '../controllers/movies';
import { validateCreateMovie, validateRemoveMovie } from '../middlewares/validators';

const router = express.Router();

router.get('/', getSavedMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieId', validateRemoveMovie, removeMovie);

export default router;
