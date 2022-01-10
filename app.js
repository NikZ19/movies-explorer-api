import './utils/env';

import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errors } from 'celebrate';
import error from './middlewares/error';
import { requestLogger, errorLogger } from './middlewares/logger';
import routes from './routes/index';
import limiter from './middlewares/rateLimit';
import corsOptions from './utils/corsOptions';

const { PORT = 3000, NODE_ENV, DB_PATH } = process.env;

const app = express();

mongoose.connect(`${NODE_ENV === 'production' ? DB_PATH : 'mongodb://localhost:27017/moviesdb'}`);

app.use(cors(corsOptions));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(limiter);

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT);
