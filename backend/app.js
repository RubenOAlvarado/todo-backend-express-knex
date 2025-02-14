import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
// app.use(`api/${process.env.API_VERSION}`, routes);

// Error handling middleware
app.use(errorHandler);

export default app;