import express from 'express';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { paramIdValidator } from '../validators/paramIdValidator.js';
import { createProjectController, getProjectsController } from '../controllers/projectsController.js';
import { projectsValidator } from '../validators/projectsValidator.js';

const router = express.Router();

router.post(
    '/:id/projects',
    paramIdValidator,
    projectsValidator,
    validationMiddleware,
    createProjectController
);

router.get(
    '/:id/projects',
    paramIdValidator,
    validationMiddleware,
    getProjectsController
);

export default router;