import { CustomError } from "../shared/errors/customError.js";

export const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomError){
        const { statusCode, errors, logging } = err;
        if(logging){
            console.error(JSON.stringify({
                code: err.statusCode,
                errors: err.errors,
                stack: err.stack
            }, null, 2));
        }
        res.status(statusCode).send({ errors });
    }

    console.error(JSON.stringify(err,null,2));
    res.status(500).json({ message: 'Something went wrong' });
};