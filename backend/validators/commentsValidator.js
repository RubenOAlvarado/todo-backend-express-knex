import { check } from "express-validator";

export const commentsValidator = [
    check('content')
        .isString()
        .withMessage('Content must be a string')
        .isLength({ min: 1 })
        .withMessage('Content must not be empty')
        .notEmpty()
        .withMessage('Content must not be empty')
        .trim(),
];

export const updateCommentValidator = [
    check('content')
        .isString()
        .withMessage('Content must be a string')
        .isLength({ min: 1 })
        .withMessage('Content must not be empty')
        .notEmpty()
        .withMessage('Content must not be empty')
        .trim()
        .optional(),
];