import { check } from "express-validator";

export const organizationValidator = [
    check('name')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 3, max: 255 })
        .withMessage('Name must be between 3 and 255 characters long')
        .notEmpty().withMessage('Name is required')
        .trim(),
];

export const organizationUpdateValidator = [
    check('name')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 3, max: 255 })
        .withMessage('Name must be between 3 and 255 characters long')
        .optional()
        .trim(),
];