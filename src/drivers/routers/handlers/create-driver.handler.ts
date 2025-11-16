import {Request, Response} from "express";
import {vehicleInputDtoValidation} from "../../validation/vehicleInputDtoValidation";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {Driver} from "../../types/types";
import {db} from "../../../db/in-memory.db";

export const createDriverHandler = (req: Request,  res: Response) => {
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
}