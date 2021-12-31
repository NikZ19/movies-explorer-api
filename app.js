import './utils/env';

import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import error from './middlewares/error';
import { requestLogger, errorLogger } from './middlewares/logger';
import routes from './routes/index';
import limiter from './middlewares/rateLimit';

const { PORT = 3000, DB_PATH } = process.env;

const app = express();

mongoose.connect(DB_PATH);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(limiter);

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);

app.use(error);

app.listen(PORT);
