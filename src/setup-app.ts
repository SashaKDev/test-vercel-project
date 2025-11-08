import express, {Express, Request, Response} from 'express';
import {db} from "./db/in-memory.db";
import {Driver, VehicleFeature} from "./drivers/types/types";
import {DriverInputDto} from "./drivers/dto/driver.input-dto";

export const setupApp = (app: Express) => {

    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res
            .status(200)
            .json({ message: 'Hello world!' })
    });
    app.get('/drivers', (req: Request, res: Response) => {
        res
            .status(200)
            .json(db.drivers);

    });
    app.get('/drivers/:id', (req: Request<{id:string}, Driver>, res: Response<Driver | null>) => {
        const foundDriver = db.drivers.find(d => d.id === +req.params.id);

        if (!foundDriver) {
            res.sendStatus(404);
            return;
        }

        res
            .status(200)
            .json(foundDriver);
    });
    app.post('/drivers', (req: Request<{}, Driver, DriverInputDto>, res: Response<Driver>) => {
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
    app.delete('/testing/all-data', (req: Request, res: Response) => {
        db.drivers = [];
        res.sendStatus(204);
    });

    return app;
}