import 'reflect-metadata';
import './dependency-injection';
import express from 'express';
import cors from 'cors';
import {errorHandler, routeNotFound} from '@infrastructure/middlewares';
import {initializeRoutes} from '@infrastructure/routes';
import {Env} from '@infrastructure/configurations';
import {logger, loggerMiddleware} from '@shared/logger';

const app = express();
app.use(loggerMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(Env.SERVER_BASE_ROUTE, initializeRoutes());
app.use(routeNotFound);
app.use(errorHandler);

app.listen(Env.SERVER_PORT, () => {
  logger.info(`Server started on port #${Env.SERVER_PORT}`);
});
