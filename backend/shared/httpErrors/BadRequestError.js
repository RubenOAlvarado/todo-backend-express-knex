import { CustomError } from "../errors/customError.js";

export default class BadRequestError extends CustomError {
    STATUS_CODE = 400;
    _code;
    _logging;
    _context;

    constructor(code, message, context, logging=false) {
        super(message || 'Bad Request');
        this._code = code || this.STATUS_CODE;
        this._logging = logging;
        this._context = context || {};

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    get errors() {
        return [{
            message: this.message,
            context: this._context
        }];
    }

    get logging() {
        return this._logging;
    }

    get code() {
        return this._code;
    }
}