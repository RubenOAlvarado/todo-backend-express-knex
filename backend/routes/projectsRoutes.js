import express from 'express';
import { updateProjectValidator } from '../validators/projectsValidator.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { deleteProjectController, getProjectByIdController, updateProjectController } from '../controllers/projectsController.js';
import { paramIdValidator } from '../validators/paramIdValidator.js';

const router = express.Router();

router.get(
    '/:id',
    paramIdValidator,
    validationMiddleware,
    getProjectByIdController
);

router.put(
    '/:id',
    paramIdValidator,
    updateProjectValidator,
    validationMiddleware,
    updateProjectController
);

router.delete(
    '/:id',
    paramIdValidator,
    validationMiddleware,
    deleteProjectController
);

export default router;