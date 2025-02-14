import { check } from "express-validator";

export const usersValidator = [
    check('email')
        .isEmail().withMessage('Email is not valid')
        .isLength({ min: 5, max: 255 }).withMessage('Email must be between 5 and 255 characters')
        .notEmpty().withMessage('Email is required'),
    check('password')
        .isLength({ min: 6, max: 255 }).withMessage('Password must be between 6 and 255 characters')
        .notEmpty().withMessage('Password is required'),
];