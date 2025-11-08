import express, {Request, Response} from "express";
import {db} from "../../db/in-memory.db";
import {vehicleInputDtoValidation} from "../validation/vehicleInputDtoValidation";
import {createErrorMessages} from "../../core/utils/error.utils";
import {Driver} from "../types/types";


export const driversRouter = express.Router({});

driversRouter
    .get('', (req: Request, res: Response) => {
    res
        .status(200)
        .json(db.drivers);

})
    .get('/:id', (req: Request, res: Response) => {
        const foundDriver = db.drivers.find(d => d.id === +req.params.id);

        if (!foundDriver) {
            res.sendStatus(404);
            return;
        }

        res
            .status(200)
            .json(foundDriver);
    })
    .post('', (req: Request, res: Response) => {

        const errors = vehicleInputDtoValidation(req.body);

        if (errors.length > 0) {
            res
                .status(400)
                .json(createErrorMessages(errors));
            return;
        }

        const newDriver: Driver = {
            id: db.drivers.length ? db.drivers.length + 1 : 1,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            vehicleMake: req.body.vehicleMake, //toyota
            vehicleModel: req.body.vehicleModel, //camry
            vehicleYear: req.body.vehicleYear,
            vehicleLicensePlate: req.body.vehicleLicensePlate,
            vehicleDescription: req.body.vehicleDescription,
            vehicleFeatures: req.body.vehicleFeatures,
            createdAt: new Date()
        }

        db.drivers.push(newDriver);
        res
            .status(201)
            .json(newDriver);
    });
