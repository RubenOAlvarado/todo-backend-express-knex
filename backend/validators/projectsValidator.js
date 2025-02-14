import { check } from "express-validator";

export const projectsValidator = [
    check('name')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 3, max: 255 }).withMessage('Name must be between 3 and 255 characters')
        .notEmpty().withMessage('Name is required')
        .trim(),
    check('organization_id')
        .isNumeric().withMessage('Organization ID must be a number')
        .notEmpty().withMessage('Organization ID is required')
        .toInt(),
];