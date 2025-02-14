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
    check("status_id")
        .isNumeric().withMessage("Status ID must be a number")
        .notEmpty().withMessage("Status ID is required")
        .trim(),
    check("project_id")
        .isNumeric().withMessage("Project ID must be a number")
        .notEmpty().withMessage("Project ID is required")
        .trim(),
    check("created_by")
        .isNumeric().withMessage("Created by must be a number")
        .notEmpty().withMessage("Created by is required")
        .trim(),
];