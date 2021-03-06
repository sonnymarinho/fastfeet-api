import express from 'express';
import { config } from 'dotenv';
import { router } from './routes';
import { internalErrorsHandler } from '@errors/internalErrorsHandler';

config();
const app = express();

app.use(express.json());
app.use(router);
app.use(internalErrorsHandler);

export { app };
