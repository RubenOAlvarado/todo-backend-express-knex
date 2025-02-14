import express from 'express';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { paramIdValidator } from '../validators/paramIdValidator.js';
import { tasksValidator } from '../validators/tasksValidator.js';
import { createTaskController, getTasksController } from '../controllers/tasksController.js';
import { queryStatusValidator } from '../validators/queryStatusValidator.js';

const router = express.Router();

router.post(
    '/:id/tasks',
    paramIdValidator,
    tasksValidator,
    validationMiddleware,
    createTaskController
);

router.get(
    '/:id/tasks',
    paramIdValidator,
    queryStatusValidator,
    validationMiddleware,
    getTasksController
);

export default router;