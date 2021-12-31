import express from 'express';
import { celebrate, Joi } from 'celebrate';
import { getSavedMovies, createMovie, removeMovie } from '../controllers/movies';
import validateUrl from '../utils/validateUrl';

const router = express.Router();

router.get('/', getSavedMovies);
router.post('/', celebrate({
  body: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(validateUrl).required(),
    trailer: Joi.string().custom(validateUrl).required(),
    thumbnail: Joi.string().custom(validateUrl).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), removeMovie);

export default router;
