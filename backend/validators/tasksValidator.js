import { check } from "express-validator";

export const tasksValidator = [
    check("title")
        .isString().withMessage("Title must be a string")
        .isLength({ min: 3, max: 255 }).withMessage("Title must be between 3 and 255 characters")
        .notEmpty().withMessage("Title is required")
        .trim(),
    check("description")
        .optional({ nullable: true, checkFalsy: true })
        .isString().withMessage("Description must be a string")
        .isLength({ min: 3, max: 255 }).withMessage("Description must be between 3 and 255 characters")
        .trim(),
    check("createdBy")
        .isNumeric().withMessage("Created by must be a number")
        .notEmpty().withMessage("Created by is required")
        .trim(),
];

export const updateTaskValidator = [
    check("title")
        .optional({ nullable: true, checkFalsy: true })
        .isString().withMessage("Title must be a string")
        .isLength({ min: 3, max: 255 }).withMessage("Title must be between 3 and 255 characters")
        .trim(),
    check("description")
        .optional({ nullable: true, checkFalsy: true })
        .isString().withMessage("Description must be a string")
        .isLength({ min: 3, max: 255 }).withMessage("Description must be between 3 and 255 characters")
        .trim(),
    check("statusId")
        .optional({ nullable: true, checkFalsy: true })
        .isNumeric().withMessage("Status ID must be a number")
        .trim(),
    check("createdBy")
        .optional({ nullable: true, checkFalsy: true })
        .isNumeric().withMessage("Created by must be a number")
        .trim(),
];


export const changeTaskStatusValidator = [
    check("statusId")
        .isNumeric().withMessage("Status ID must be a number")
        .notEmpty().withMessage("Status ID is required")
        .trim(),
];

export const assignTaskValidator = [
    check("userId")
        .isNumeric().withMessage("User ID must be a number")
        .notEmpty().withMessage("User ID is required")
        .trim(),
];