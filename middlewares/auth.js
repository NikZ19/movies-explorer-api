import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';

const { NODE_ENV, JWT_SECRET } = process.env;

export default (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError('Вы не авторизированы!');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-key');
  } catch (err) {
    throw new UnauthorizedError('Вы не авторизированы!');
  }

  req.user = payload;

  next();
};
