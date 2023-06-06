import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
function validate(req: Request, res: Response, next: NextFunction) {
    console.log("validate request", req.body)
    const error = validationResult(req);
    const hasError = !error.isEmpty();
    if (hasError) {
        res.status(400).json({ error: error.array() });
    } else {
        next();
    }
}

export default validate;