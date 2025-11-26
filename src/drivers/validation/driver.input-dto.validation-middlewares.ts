import {body, ValidationError} from 'express-validator';

const nameValidation = body('name')
    .isString().withMessage('Must be string')
    .trim()
    .isLength({min: 2, max: 15}).withMessage('Name length is not correct')

const phoneNumberValidation = body('phoneNumber')
    .isString().withMessage('Must be string')
    .trim()
    .isLength({min: 8, max: 15}).withMessage('Phone number length is not correct')

const emailValidation = body('email')
    .isEmail().withMessage('Must be email address')

const vehicleMakeValidation = body('vehicleMake')
    .isString().withMessage('vehicleMake must be string')
    .trim()
    .isLength({min: 3, max: 100}).withMessage('vehicleMake is not correct')
