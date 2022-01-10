import validator from 'validator';
import BadRequestError from '../errors/BadRequestError';

export default (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new BadRequestError('Введена некорректная ссылка!');
  }
  return value;
};
