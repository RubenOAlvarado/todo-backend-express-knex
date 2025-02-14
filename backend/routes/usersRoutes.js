import express from 'express';
import { updateUserValidator } from '../validators/usersValidator.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { deleteUserController, getUserByIdController, updateUserController } from '../controllers/usersController.js';
import { paramIdValidator } from '../validators/paramIdValidator.js';

const router = express.Router();

router.get(
    '/:id',
    paramIdValidator,
    validationMiddleware,
    getUserByIdController
);

router.put(
    '/:id',
    paramIdValidator,
    updateUserValidator,
    validationMiddleware,
    updateUserController
);

router.delete(
    '/:id',
    paramIdValidator,
    validationMiddleware,
    deleteUserController
);

export default router;