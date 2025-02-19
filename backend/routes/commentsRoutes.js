import express from 'express';
import { paramIdValidator } from '../validators/paramIdValidator.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { deleteTaskCommentController, getTaskCommentByIdController, updateTaskCommentController } from '../controllers/commentsController.js';
import { updateCommentValidator } from '../validators/commentsValidator.js';

const router = express.Router();


router.get(
    '/:id',
    paramIdValidator,
    validationMiddleware,
    getTaskCommentByIdController,
);

router.put(
    '/:id',
    paramIdValidator,
    updateCommentValidator,
    validationMiddleware,
    updateTaskCommentController,
);

router.delete(
    '/:id',
    paramIdValidator,
    validationMiddleware,
    deleteTaskCommentController,
);

export default router;