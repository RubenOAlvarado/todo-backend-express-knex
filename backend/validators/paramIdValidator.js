import { param } from "express-validator";

export const paramIdValidator = [
    param("id")
        .isNumeric().withMessage("Id must be a number")
        .isInt({ min: 1 }).withMessage("Id must be a positive number"),
];