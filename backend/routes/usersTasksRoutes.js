import express from 'express';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { paramIdValidator } from '../validators/paramIdValidator.js';
import { getTaskAssignmentsController } from '../controllers/tasksController.js';

const router = express.Router();

router.get(
    '/:id/tasks',
    paramIdValidator,
    validationMiddleware,
    getTaskAssignmentsController
);

export default router;