import express from 'express';
import { createOrganization, deleteOrganization, getOrganization, getOrganizations, updateOrganization } from '../controllers/organizationsController.js';
import { organizationUpdateValidator, organizationValidator } from '../validators/organizationsValidator.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { paramIdValidator } from '../validators/paramIdValidator.js';

const router = express.Router();


router.post(
    '/', 
    organizationValidator, 
    validationMiddleware, 
    createOrganization
);

router.get(
    '/',
    getOrganizations
);

router.get(
    '/:id',
    paramIdValidator,
    validationMiddleware,
    getOrganization
);

router.put(
    '/:id',
    paramIdValidator,
    organizationUpdateValidator,
    validationMiddleware,
    updateOrganization
);

router.delete(
    '/:id',
    paramIdValidator,
    validationMiddleware,
    deleteOrganization
);

export default router;