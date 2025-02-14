import { CustomError } from "../errors/customError";

export default class NotFoundError extends CustomError {
    STATUS_CODE = 404;
    _code;
    _logging;
    _context;

    constructor(code, message, context, logging=false) {
        super(message || 'Not found');
        this._code = code || this.STATUS_CODE;
        this._logging = logging;
        this._context = context || {};

        Object.setPrototypeOf(this, NotFoundError.prototype);
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