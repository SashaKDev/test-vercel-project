import {param} from 'express-validator';

export const idValidationMiddleware = param('id')
    .exists().withMessage('id is required')
    .isLength({min: 1}).withMessage('Must not be empty')
    .isNumeric().withMessage('Must be a number')