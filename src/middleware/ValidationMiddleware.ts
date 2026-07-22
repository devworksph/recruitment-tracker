import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";

const ajv = new Ajv();

export class ValidationMiddleware {

    static validate(schema: object) {

        const validate = ajv.compile(schema);

        return (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {

            const valid = validate(req.body);

            if (!valid) {
                return res.status(400).json({
                    success: false,
                    errors: validate.errors
                });
            }

            next();
        };
    }
}