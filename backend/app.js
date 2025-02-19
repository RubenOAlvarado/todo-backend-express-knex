import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import organizationRoutes from './routes/organizationsRoutes.js';
import organizationsProjectsRoutes from './routes/organizationsProjectRoutes.js';
import organizationUsersRoutes from './routes/organizationsUsersRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import projectsTasksRoutes from './routes/projectsTasksRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';
import userRoutes from './routes/usersRoutes.js';
import usersTaskRoutes from './routes/usersTasksRoutes.js';
import taskCommentsRoutes from './routes/taskCommentsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Error handling middleware
app.use(errorHandler);

// Routes
const BASE_PATH = `/api/${process.env.API_VERSION}`;
app.use(`${BASE_PATH}/organizations`, organizationRoutes);
app.use(`${BASE_PATH}/organizations`, organizationsProjectsRoutes);
app.use(`${BASE_PATH}/organizations`, organizationUsersRoutes);
app.use(`${BASE_PATH}/projects`, projectsRoutes);
app.use(`${BASE_PATH}/projects`, projectsTasksRoutes);
app.use(`${BASE_PATH}/tasks`, tasksRoutes);
app.use(`${BASE_PATH}/tasks`, taskCommentsRoutes);
app.use(`${BASE_PATH}/comments`, commentsRoutes);
app.use(`${BASE_PATH}/users`, userRoutes);
app.use(`${BASE_PATH}/users`, usersTaskRoutes);

process.on('unhandledRejection', (reason, promise) => {
    console.error('🔥 Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('💥 Uncaught Exception:', err);
    process.exit(1);
});

export default app;