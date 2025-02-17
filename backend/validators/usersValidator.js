import { check } from "express-validator";

export const usersValidator = [
    check('email')
        .isEmail().withMessage('Email is not valid')
        .isLength({ min: 5, max: 255 }).withMessage('Email must be between 5 and 255 characters')
        .notEmpty().withMessage('Email is required'),
    check('password')
        .isLength({ min: 6, max: 255 }).withMessage('Password must be between 6 and 255 characters')
        .notEmpty().withMessage('Password is required'),
    check('role')
        .isIn(['user', 'admin']).withMessage('Role must be either user or admin')
        .notEmpty().withMessage('Role is required'),
];

export const updateUserValidator = [
    check('email')
        .isEmail().withMessage('Email is not valid')
        .isLength({ min: 5, max: 255 }).withMessage('Email must be between 5 and 255 characters')
        .optional(),
    check('password')
        .isLength({ min: 6, max: 255 }).withMessage('Password must be between 6 and 255 characters')
        .optional(),
    check('role')
        .isIn(['user', 'admin']).withMessage('Role must be either user or admin')
        .optional(),
];

export const userIdValidator = [
    check('userId')
        .isNumeric().withMessage('ID must be a number')
        .notEmpty().withMessage('ID is required'),
];