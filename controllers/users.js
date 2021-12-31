import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({ _id: user._id, name: user.name, email: user.email }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      if (err.code === 11000) {
        next(new ConflictError('Email занят'));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCreditionals(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-key', { expiresIn: '7d' });
      // res.status(200).send({ token });
      res.status(200).cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .send({ message: 'Вы авторизованы!' })
        .end();
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
  })
    .send({ message: 'Cookie удалены' });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send({ email: user.email, name: user.name }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден!');
      }
      return res.status(200).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

export {
  createUser,
  login,
  signout,
  getCurrentUser,
  updateUser,
};
