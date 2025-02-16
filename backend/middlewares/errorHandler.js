import { CustomError } from "../shared/errors/customError.js";

export const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        if (err.logging) {
            console.error(JSON.stringify({
                statusCode: err.statusCode,
                message: err.message,
                context: err.context,
                stack: err.stack
            }, null, 2));
        }

        return res.status(err.statusCode).json({ errors: err.errors });
    }

    console.error(JSON.stringify({
        statusCode: 500,
        message: err.message || 'Internal Server Error',
        stack: err.stack
    }, null, 2));

    return res.status(500).json({ 
        errors: [{ message: 'Something went wrong' }] 
    });
};