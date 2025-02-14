import { query } from "express-validator";

export const queryStatusValidator = [
    query("status")
        .optional({ nullable: true, checkFalsy: true })
        .isIn(["To Do", "In Progress", "Done"]).withMessage("Status must be either active or inactive")
];