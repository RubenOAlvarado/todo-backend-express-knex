import express from 'express';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { paramIdValidator } from '../validators/paramIdValidator.js';
import { createUserController, getUsersController } from '../controllers/usersController.js';
import { usersValidator } from '../validators/usersValidator.js';

const router = express.Router();

router.post(
    '/:id/users',
    paramIdValidator,
    usersValidator,
    validationMiddleware,
    createUserController
);

router.get(
    '/:id/users',
    paramIdValidator,
    validationMiddleware,
    getUsersController
);

export default router;