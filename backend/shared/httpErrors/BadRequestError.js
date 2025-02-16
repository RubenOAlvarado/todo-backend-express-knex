import { CustomError } from "../errors/customError.js";

export default class BadRequestError extends CustomError {
    constructor(message = 'Bad Request', context = {}, logging = false) {
        super(message, 400, context, logging);
    }
}