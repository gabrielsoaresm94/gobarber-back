import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';

import '../typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    _: express.NextFunction,
  ) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
        status: false,
      });
    }

    console.error(err);

    return res.status(500).json({
      message: 'Internal server error', // err.message,
      status: false,
    });
  },
);

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3001!');
});
