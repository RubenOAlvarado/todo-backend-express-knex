import { CustomError } from "../errors/customError.js";

export default class NotFoundError extends CustomError {
    constructor(message = 'Not Found', context = {}, logging = false) {
        super(message, 404, context, logging);
    }
}