import express from 'express';
import { paramIdValidator } from '../validators/paramIdValidator.js';
import { commentsValidator } from '../validators/commentsValidator.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { createTaskCommentController, getTaskCommentsController } from '../controllers/commentsController.js';

const router = express.Router();


router.post(
    '/:id/comments',
    paramIdValidator,
    commentsValidator,
    validationMiddleware,
    createTaskCommentController
);

router.get(
    '/:id/comments',
    paramIdValidator,
    validationMiddleware,
    getTaskCommentsController
);

export default router;