import express from 'express';
import { paramIdValidator } from '../validators/paramIdValidator.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { assignTaskController, changeTaskStatusController, deleteTaskController, getTaskByIdController, unassignTaskController, updateTaskController } from '../controllers/tasksController.js';
import { assignTaskValidator, changeTaskStatusValidator, updateTaskValidator } from '../validators/tasksValidator.js';

const router = express.Router();

router.get(
    '/:id',
    paramIdValidator,
    validationMiddleware,
    getTaskByIdController
);

router.put(
    '/:id',
    paramIdValidator,
    updateTaskValidator,
    validationMiddleware,
    updateTaskController
);

router.delete(
    '/:id',
    paramIdValidator,
    validationMiddleware,
    deleteTaskController
);

router.patch(
    '/:id/status',
    paramIdValidator,
    changeTaskStatusValidator,
    validationMiddleware,
    changeTaskStatusController
);

router.post(
    '/:id/assign',
    paramIdValidator,
    assignTaskValidator,
    validationMiddleware,
    assignTaskController
);

router.delete(
    '/:id/assign',
    paramIdValidator,
    validationMiddleware,
    unassignTaskController
);

export default router;