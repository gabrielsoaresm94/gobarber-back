import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { isCelebrate } from 'celebrate';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';
import rateLimiter from './middlewares/rateLimiter';

import '../typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

// Middleware para erros no corpo, da requisição
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    if (isCelebrate(err)) {
      return res.status(400).json({
        message: 'Problemas no corpo ou parâmetros da requisição',
        status: false,
        erro: err.joi.message,
        metadata: {
          source: err.meta.source,
          keys: [],
        },
      });
    }

    return res.status(400).json({
      message: 'Bad request!',
      status: false,
      erro: err.message,
    });
  },
);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _: express.NextFunction,
  ) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
        status: false,
      });
    }

    return res.status(500).json({
      message: 'Internal server error!',
      status: false,
      erro: err.message,
    });
  },
);

// const routes = express.Router();
// routes.get('/', (req, res) => {
//   res.status(200).send('Hello World!');
// });
// app.use(routes);

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3001!');
});
