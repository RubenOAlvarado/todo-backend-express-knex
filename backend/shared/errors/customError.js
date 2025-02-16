export class CustomError extends Error {
    constructor(message, statusCode = 500, context = {}, logging = false) {
        super(message);
        this.statusCode = statusCode;
        this.context = context;
        this.logging = logging;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    get errors() {
        return [{ message: this.message, context: this.context }];
    }
}