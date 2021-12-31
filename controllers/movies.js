import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';
import NotFoundError from '../errors/NotFoundError';
import ForbiddenError from '../errors/ForbiddenError';
import Movie from '../models/movie';

const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { ...data } = req.body;

  Movie.find({ owner: req.user._id, movieId: data.movieId })
    .then((movies) => {
      if (movies.length >= 1) {
        throw new ConflictError('Такой фильм уже добавлен!');
      }
      Movie.create({
        ...data,
        owner: req.user._id,
      })
        .then((movie) => res.status(201).send(movie))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError('Переданы некоректные данные!');
          }
        });
    })
    .catch(next);
};

const removeMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Такого фильма нет!');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нелья удалить чужой фильм!');
      }
      return movie.remove()
        .then((removedMovie) => res.status(200).send({ data: removedMovie }));
    })
    .catch(next);
};

export {
  getSavedMovies,
  createMovie,
  removeMovie,
};
