export class CustomError extends Error {
    statusCode;
    errors;
    logging;

    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}